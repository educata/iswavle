import { InjectionToken } from '@angular/core';
import { LogGreeter } from '@app-shared/interfaces';
import { DEFAULT_LOG_DATA } from '@app-shared/consts';

export const LOG_GREETER = new InjectionToken<LogGreeter[]>('LOG_GREETER', {
  providedIn: 'root',
  factory: () => DEFAULT_LOG_DATA,
});
