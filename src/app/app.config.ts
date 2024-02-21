import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { TitleStrategy, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ka_GE, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import ka from '@angular/common/locales/ka';
import { SwTitleStrategy } from '@app-shared/services';

registerLocaleData(ka);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideNzI18n(ka_GE),
    importProvidersFrom(FormsModule),
    provideAnimations(),
    {
      provide: TitleStrategy,
      useClass: SwTitleStrategy,
    },
  ],
};
