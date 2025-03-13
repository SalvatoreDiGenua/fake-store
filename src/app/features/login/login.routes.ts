import { Routes } from '@angular/router';
import { isUserLoggedGuard } from '../../guards/is-user-logged.guard';
import { hasCartProducts } from '../../guards/has-cart-products.guard';

export const loginRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
    canActivate: [isUserLoggedGuard, hasCartProducts],
  },
];
