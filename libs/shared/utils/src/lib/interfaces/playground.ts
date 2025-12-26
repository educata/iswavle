import { Observable } from 'rxjs';

export type PlaygroundEffects<T = unknown> = Record<string, Observable<T>>;
