import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/observable/throw';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(public router: Router) {
  }

  public handleError(err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      console.log('An error occurred:', err.error.message);
    } else {
      console.log(`Backend returned code ${err.status}, body was:`);
      console.log(err.error);
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {   
    if (req.url.includes('/Auth')) {
      return next.handle(req);
    }
    else {     
      const request = req.clone({ headers: req.headers.set('Authorization', "Basic " + btoa(localStorage.getItem('token'))) });
      return next.handle(request)
      .catch(error => {
        if (error.status == 401) {
          this.router.navigate(["/login"]);
        }
        this.handleError(error);
        return Observable.throw(error);
      });
    }
  }
}
