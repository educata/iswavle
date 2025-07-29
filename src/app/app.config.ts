import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  TitleStrategy,
  provideRouter,
  withInMemoryScrolling,
} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ka_GE, provideNzI18n } from 'ng-zorro-antd/i18n';
import { IMAGE_CONFIG, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import ka from '@angular/common/locales/ka';
import { SwTitleStrategy } from '@app-shared/services';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  GithubOutline,
  BgColorsOutline,
  MenuOutline,
} from '@ant-design/icons-angular/icons';

registerLocaleData(ka);
const icons: IconDefinition[] = [GithubOutline, BgColorsOutline, MenuOutline];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideNzI18n(ka_GE),
    provideNzIcons(icons),
    importProvidersFrom(FormsModule),
    provideAnimations(),
    {
      provide: TitleStrategy,
      useClass: SwTitleStrategy,
    },
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true,
      },
    },
  ],
};
