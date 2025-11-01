import { InjectionToken } from '@angular/core';
import { Environment } from '@iswavle/shared/utils';
import { environment } from '../environments/environment';

export const ENVIRONMENT = new InjectionToken<Environment>('ENVIRONMENT', {
  providedIn: 'root',
  factory: () => environment,
});
