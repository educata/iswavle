import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import ka from '@angular/common/locales/ka';
import { registerLocaleData } from '@angular/common';
import { NZ_I18N, ka_GE } from 'ng-zorro-antd/i18n';

import { routes } from './app.routes';
import { DOCS_CONTENT_LOADER } from './shared/providers';
import { ContentLoaderService } from './shared/services';

registerLocaleData(ka);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    {
      provide: DOCS_CONTENT_LOADER,
      useClass: ContentLoaderService,
    },
    {
      provide: NZ_I18N,
      useExisting: ka_GE,
    },
  ],
};
