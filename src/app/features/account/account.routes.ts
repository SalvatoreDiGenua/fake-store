import { Routes } from '@angular/router';
import { isUserLoggedGuard } from '../../guards/is-user-logged.guard';

export const accountRoutes: Routes = [
  {
    path: 'account',
    loadComponent: () =>
      import('./account.component').then((m) => m.AccountComponent),
    canActivate: [isUserLoggedGuard],
  },
];
