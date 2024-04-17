import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export type PlaygroundEffects<T = unknown> = Record<string, Observable<T>>;

export const PLAYGROUND_EFFECTS = new InjectionToken<PlaygroundEffects>(
  'PLAYGROUND_EFFECTS',
);
