import { InjectionToken, Provider } from '@angular/core';
import { WebContainerState } from '../interfaces';
import { WebContainerService } from '../services';

export const WEBCONTAINER_STATE = new InjectionToken<WebContainerState>(
  'WEBCONTAINER_STATE',
);

export function provideWebcontainerState(): Provider {
  return {
    provide: WEBCONTAINER_STATE,
    useClass: WebContainerService,
  };
}
