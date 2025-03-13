import { Routes } from '@angular/router';
import { isUserLoggedGuard } from '../../guards/is-user-logged.guard';
import { hasCartProducts } from '../../guards/has-cart-products.guard';

export const orderConfirmedRoutes: Routes = [
  {
    path: 'order-confirmed',
    loadComponent: () =>
      import('./order-confirmed.component').then(
        (m) => m.OrderConfirmedComponent,
      ),
    canActivate: [isUserLoggedGuard, hasCartProducts],
  },
];
