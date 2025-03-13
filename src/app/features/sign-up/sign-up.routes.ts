import { Routes } from '@angular/router';

export const signupRoutes: Routes = [
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./sign-up.component').then((m) => m.SignUpComponent),
  },
];
