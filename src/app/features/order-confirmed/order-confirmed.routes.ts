import { Routes } from '@angular/router';
import { hasCartProducts } from '../../guards/has-cart-products.guard';
import { isUserLoggedGuard } from '../../guards/is-user-logged.guard';

export const orderConfirmedRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./order-confirmed.component').then(
        (m) => m.OrderConfirmedComponent,
      ),
    canActivate: [isUserLoggedGuard, hasCartProducts],
  },
];

export default orderConfirmedRoutes;
