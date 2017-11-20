import { Injectable, InjectionToken, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/observable/throw';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  private _authService: AuthService;

  constructor(private router: Router, private injector: Injector) {
  }

  public handleError(err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      console.log('An error occurred:', err.error.message);
    } else {
      console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {   
    if (req.url.includes('/Auth')) {
      return next.handle(req);
    }
    else {
      this._authService = this.injector.get(AuthService);
      
      const request = req.clone({ headers: req.headers.set('Authorization', "Basic " + btoa(localStorage.getItem('token'))) });
      return next.handle(request)
      .catch(error => {
        if (error.status == 401) {
          this.router.navigate(["/login"]);
        }
        if (error.status != 200) {
          this.handleError(error);
        }
        return Observable.throw(error);
      });
    }
  }
}
