import { Route, Routes, UrlSegment } from '@angular/router';
import {
  codeResolver,
  contentResolver,
  exerciesesResolver,
} from './shared/resolvers';

const indeterminateSegments = (url: UrlSegment[]) => {
  if (url.length) {
    const segmentMap: { [key: string]: UrlSegment } = {};
    url.forEach((segment, index) => {
      segmentMap[index.toString()] = segment;
    });
    return {
      consumed: url,
      posParams: segmentMap,
    };
  } else {
    return null;
  }
};

const DEFAULT_PLAYGROUND_CHILD: Route = {
  path: '',
  pathMatch: 'full',
  redirectTo: 'blank',
};

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component'),
    title: 'მთავარი',
  },
  {
    path: 'exercieses',
    title: 'სავარჯიშოები',
    loadChildren: () => [
      {
        path: '',
        loadComponent: () =>
          import('./features/exercieses/exercieses-list/exercieses.component'),
      },
      {
        path: ':exercieses_name',
        resolve: { data: exerciesesResolver },
        loadComponent: () =>
          import(
            './features/exercieses/exercieses-viewer/exercieses-viewer.component'
          ),
      },
    ],
  },
  {
    path: 'doc',
    title: 'დოკუმენტაცია',
    loadChildren: () => [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'guides',
      },
      {
        // Match for indeterminate amount of segments
        // as we don't know how deeply nested the markdown content is.
        matcher: indeterminateSegments,
        loadComponent: () => import('./features/docs/docs.component'),
        resolve: { data: contentResolver },
      },
    ],
  },
  {
    path: 'playground',
    title: 'ედიტორი',
    loadChildren: () => [
      {
        path: 'simple',
        loadChildren: () => [
          DEFAULT_PLAYGROUND_CHILD,
          {
            matcher: indeterminateSegments,
            loadComponent: () =>
              import(
                './features/playground/playground-simple/playground-simple.component'
              ),
            resolve: { data: codeResolver },
          },
        ],
      },
      {
        path: 'wc',
        loadChildren: () => [
          DEFAULT_PLAYGROUND_CHILD,
          {
            matcher: indeterminateSegments,
            loadComponent: () =>
              import(
                './features/playground/playground-wc/playground-wc.component'
              ),
            resolve: { data: codeResolver },
          },
        ],
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'simple/blank',
      },
    ],
  },
  {
    path: '404',
    loadComponent: () => import('./features/not-found/not-found.component'),
    title: 'გვერდი ვერ მოიძებნა',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404',
  },
];
