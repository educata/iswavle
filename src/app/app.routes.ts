import { Routes } from '@angular/router';
import { contentResolver } from './shared/resolvers';

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
        path: ':section',
        loadComponent: () => import('./features/docs/docs.component'),
        resolve: { data: contentResolver },
      },
      {
        path: ':section/:subject',
        loadComponent: () => import('./features/docs/docs.component'),
        resolve: { data: contentResolver },
      },
      {
        path: ':section/:subject/:topic',
        loadComponent: () => import('./features/docs/docs.component'),
        resolve: { data: contentResolver },
      },
      {
        path: ':section/:subject/:topic/:subtopic',
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
        path: ':id',
        loadComponent: () =>
          import('./features/playground/playground.component'),
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
