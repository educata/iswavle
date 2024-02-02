import { InjectionToken } from '@angular/core';
import { LogGreeter } from '../interfaces';
import { DEFAULT_LOG_DATA } from '../consts';

export const LOG_GREETER = new InjectionToken<LogGreeter[]>('LOG_GREETER', {
  providedIn: 'root',
  factory: () => DEFAULT_LOG_DATA,
});
