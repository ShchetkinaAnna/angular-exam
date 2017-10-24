import { Injectable, Inject, InjectionToken } from '@angular/core';
export const API_URL = new InjectionToken<string>('API_URL');

@Injectable()
export class UserproviderService {

  constructor(@Inject(API_URL) private message: string) { }

  public GetUsers() {
    return this.message;
  }



}
