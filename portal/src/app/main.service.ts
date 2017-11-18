import { Injectable, InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL');

@Injectable()
export class MainService {

  constructor() { }

}
