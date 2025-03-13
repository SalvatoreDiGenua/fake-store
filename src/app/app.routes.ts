import { Routes } from '@angular/router';
import { shopRoutes } from './features/shop/shop.routes';
import { orderConfirmedRoutes } from './features/order-confirmed/order-confirmed.routes';
import { loginRoutes } from './features/login/login.routes';
import { checkoutRoutes } from './features/checkout/checkout.routes';
import { cartRoutes } from './features/cart/cart.routes';
import { accountRoutes } from './features/account/account.routes';
import { signupRoutes } from './features/sign-up/sign-up.routes';

export const routes: Routes = [
  ...loginRoutes,
  ...signupRoutes,
  ...shopRoutes,
  ...accountRoutes,
  ...cartRoutes,
  ...checkoutRoutes,
  ...orderConfirmedRoutes,
  {
    path: '**',
    redirectTo: 'shop/products',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '**',
  },
];
