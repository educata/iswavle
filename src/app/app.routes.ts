import { Routes, UrlSegment } from '@angular/router';
import { contentResolver } from './shared/resolvers';
import { codeResolver } from './shared/resolvers/code.resolver';

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

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component'),
  },
  {
    path: 'exercieses',
    loadComponent: () => import('./features/exercieses/exercieses.component'),
  },
  {
    path: 'doc',
    loadChildren: () => [
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
    loadChildren: () => [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'blank',
      },
      {
        matcher: indeterminateSegments,
        loadComponent: () =>
          import('./features/playground/playground.component'),
        resolve: { data: codeResolver },
      },
    ],
  },
  {
    path: '404',
    loadComponent: () => import('./features/not-found/not-found.component'),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404',
  },
];
