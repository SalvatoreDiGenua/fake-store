import { Routes } from '@angular/router';

export const signupRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./sign-up.component').then((m) => m.SignUpComponent),
  },
];

export default signupRoutes;
