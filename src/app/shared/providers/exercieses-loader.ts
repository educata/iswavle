import { InjectionToken } from '@angular/core';
import { ContentLoader } from '@app-shared/interfaces';
import { ExerciesesContent } from '@app-shared/interfaces/exercieses';
import { ExerciesesLoaderService } from '@app-shared/services/exercieses-loader.service';

export const EXERCIESES_LOADER = new InjectionToken<
  ContentLoader<ExerciesesContent>
>('EXERCIESES_LOADER', {
  providedIn: 'root',
  factory: () => new ExerciesesLoaderService(),
});
