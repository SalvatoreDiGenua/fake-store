import { Routes } from '@angular/router';
import { hasCartProducts } from './guards/has-cart-products.guard';
import { isUserLoggedGuard } from './guards/is-user-logged.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./features/sign-up/sign-up.component').then(
        (m) => m.SignUpComponent,
      ),
  },
  {
    path: 'account',
    loadComponent: () =>
      import('./features/account/account.component').then(
        (m) => m.AccountComponent,
      ),
    canActivate: [isUserLoggedGuard],
  },
  {
    path: 'shop',
    pathMatch: 'full',
    redirectTo: 'shop/products',
  },
  {
    path: 'shop',
    loadComponent: () =>
      import('./features/shop/shop.component').then((m) => m.ShopComponent),
    children: [
      {
        path: 'products',
        loadComponent: () =>
          import('./features/shop/components/products/products.component').then(
            (m) => m.ProductsComponent,
          ),
        canActivate: [isUserLoggedGuard],
      },
      {
        path: 'products/:idProduct/details',
        loadComponent: () =>
          import(
            './features/shop/components/product-details/product-details.component'
          ).then((m) => m.ProductDetailsComponent),
        canActivate: [isUserLoggedGuard],
      },
    ],
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart.component').then((m) => m.CartComponent),
    canActivate: [isUserLoggedGuard],
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./features/checkout/checkout.component').then(
        (m) => m.CheckoutComponent,
      ),
    canActivate: [isUserLoggedGuard, hasCartProducts],
  },
  {
    path: 'order-confirmed',
    loadComponent: () =>
      import('./features/order-confirmed/order-confirmed.component').then(
        (m) => m.OrderConfirmedComponent,
      ),
    canActivate: [isUserLoggedGuard, hasCartProducts],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'shop/products',
  },
  {
    path: '**',
    redirectTo: 'shop/products',
  },
];
