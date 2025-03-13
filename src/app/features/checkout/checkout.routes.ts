import { Routes } from '@angular/router';
import { isUserLoggedGuard } from '../../guards/is-user-logged.guard';
import { hasCartProducts } from '../../guards/has-cart-products.guard';

export const checkoutRoutes: Routes = [
  {
    path: 'checkout',
    loadComponent: () =>
      import('./checkout.component').then(
        (m) => m.CheckoutComponent,
      ),
    canActivate: [isUserLoggedGuard, hasCartProducts],
  },
];
