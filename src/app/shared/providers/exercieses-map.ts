import { InjectionToken } from '@angular/core';
import { ExerciesesMap, ContentLoader } from '@app-shared/interfaces';
import { ExerciesesMapService } from '@app-shared/services/exercieses-map.service';

export const EXERCIESES_MAP = new InjectionToken<ContentLoader<ExerciesesMap>>(
  'EXERCIESES_MAP',
  {
    providedIn: 'root',
    factory: () => new ExerciesesMapService(),
  },
);
