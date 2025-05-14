import { Routes } from '@angular/router';
import { ActivityFormComponent } from './activity-form/activity-form.component';
import { UploadComponent } from './upload/upload.component';

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
    path: 'add-activity/:id',
    loadComponent: () =>
      import('./add-activity/add-activity.component').then(
        (m) => m.AddActivityComponent
      ),
  },
  {
    path: 'upload',
    component: UploadComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'add-activity/0JXXQf3kuKwQYZhNpxH3',
  }
];
