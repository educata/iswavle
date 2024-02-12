import { InjectionToken, Provider } from '@angular/core';
import { WebContainerState } from '@app-shared/interfaces';
import { WebContainerService } from '@app-shared/services';

export const WEBCONTAINER_STATE = new InjectionToken<WebContainerState>(
  'WEBCONTAINER_STATE',
);

export function provideWebcontainerState(): Provider {
  return {
    provide: WEBCONTAINER_STATE,
    useClass: WebContainerService,
  };
}
