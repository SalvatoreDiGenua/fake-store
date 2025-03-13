import { Routes } from '@angular/router';
import { isUserLoggedGuard } from '../../guards/is-user-logged.guard';

export const cartRoutes: Routes = [
  {
    path: 'cart',
    loadComponent: () =>
      import('./cart.component').then((m) => m.CartComponent),
    canActivate: [isUserLoggedGuard],
  },
];
