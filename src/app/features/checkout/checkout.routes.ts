import { Routes } from '@angular/router';
import { hasCartProducts } from '../../guards/has-cart-products.guard';
import { isUserLoggedGuard } from '../../guards/is-user-logged.guard';

export const checkoutRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./checkout.component').then((m) => m.CheckoutComponent),
    canActivate: [isUserLoggedGuard, hasCartProducts],
  },
];

export default checkoutRoutes;
