import { Routes } from '@angular/router';
import { titleResolver } from './shared/resolver/title.resolver';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.routes'),
    title: titleResolver(),
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./features/sign-up/sign-up.routes'),
    title: titleResolver(),
  },
  {
    path: 'account',
    loadChildren: () => import('./features/account/account.routes'),
    title: titleResolver(),
  },
  {
    path: 'shop',
    loadChildren: () => import('./features/shop/shop.routes'),
    title: titleResolver(),
  },
  {
    path: 'cart',
    loadChildren: () => import('./features/cart/cart.routes'),
    title: titleResolver(),
  },
  {
    path: 'checkout',
    loadChildren: () => import('./features/checkout/checkout.routes'),
    title: titleResolver(),
  },
  {
    path: 'order-confirmed',
    loadChildren: () =>
      import('./features/order-confirmed/order-confirmed.routes'),
    title: titleResolver(),
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
