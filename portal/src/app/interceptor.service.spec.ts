import { TestBed, inject } from '@angular/core/testing';

import { InterceptorService } from './interceptor.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('InterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterceptorService],
      imports: [ RouterTestingModule ]
    });
  });

  it('should be created', inject([InterceptorService], (service: InterceptorService) => {
    expect(service).toBeTruthy();
  }));

  it('should be handleError', inject([InterceptorService], (service: InterceptorService) => {
    let err: HttpErrorResponse = new HttpErrorResponse({ error: new Error("ошибка на клиенте") });
    let spyOnConsole = spyOn(console, "log");

    service.handleError(err);
    expect(spyOnConsole).toHaveBeenCalledWith('An error occurred:', "ошибка на клиенте");

    err = new HttpErrorResponse({status: 500, error: {Message: "ошибка на сервере"}});
    service.handleError(err);
    expect(spyOnConsole).toHaveBeenCalledWith(`Backend returned code 500, body was:`);
    expect(spyOnConsole).toHaveBeenCalledWith(err.error);
  }));
});
