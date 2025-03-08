import { Routes } from '@angular/router';
import { hasCartProducts } from './guards/has-cart-products.guard';

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
      },
      {
        path: 'products/:idProduct/details',
        loadComponent: () =>
          import(
            './features/shop/components/product-details/product-details.component'
          ).then((m) => m.ProductDetailsComponent),
      },
    ],
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./features/checkout/checkout.component').then(
        (m) => m.CheckoutComponent,
      ),
    canActivate: [hasCartProducts],
  },
  {
    path: 'order-confirmed',
    loadComponent: () =>
      import('./features/order-confirmed/order-confirmed.component').then(
        (m) => m.OrderConfirmedComponent,
      ),
    canActivate: [hasCartProducts],
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
