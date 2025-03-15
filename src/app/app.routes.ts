import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.routes'),
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./features/sign-up/sign-up.routes'),
  },
  {
    path: 'account',
    loadChildren: () => import('./features/account/account.routes'),
  },
  {
    path: 'shop',
    loadChildren: () => import('./features/shop/shop.routes'),
  },
  {
    path: 'cart',
    loadChildren: () => import('./features/cart/cart.routes'),
  },
  {
    path: 'checkout',
    loadChildren: () => import('./features/checkout/checkout.routes'),
  },
  {
    path: 'order-confirmed',
    loadChildren: () =>
      import('./features/order-confirmed/order-confirmed.routes'),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'shop',
  },
  {
    path: '**',
    redirectTo: 'shop',
  },
];
