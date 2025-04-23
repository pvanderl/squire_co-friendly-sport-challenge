import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'manage/:id',
    loadComponent: () =>
      import('./manage-challenge/manage-challenge.component').then(
        (m) => m.ManageChallengeComponent
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'manage/0JXXQf3kuKwQYZhNpxH3',
  }
];
