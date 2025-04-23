import { Routes } from '@angular/router';
import { ActivityFormComponent } from './activity-form/activity-form.component';

export const routes: Routes = [
  {
    path: '',
    component: ActivityFormComponent
  },
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
