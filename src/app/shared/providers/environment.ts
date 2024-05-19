import { InjectionToken } from '@angular/core';
import { Environment } from '@app-shared/interfaces';
import { environment } from '../../../environments/environment';

export const ENVIRONMENT = new InjectionToken<Environment>('ENVIRONMENT', {
  providedIn: 'root',
  factory: () => environment,
});