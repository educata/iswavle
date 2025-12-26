import { InjectionToken } from '@angular/core';
import { LogGreeter } from '@iswavle/shared/utils';
import { DEFAULT_LOG_DATA } from '@iswavle/shared/utils';

export const LOG_GREETER = new InjectionToken<LogGreeter[]>('LOG_GREETER', {
  providedIn: 'root',
  factory: () => DEFAULT_LOG_DATA,
});
