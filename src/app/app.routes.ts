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
    path: '**',
    redirectTo: 'shop/products',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '**',
  },
];
