import { Routes } from '@angular/router';
import { ShopComponent } from './features/shop/shop.component';

export const routes: Routes = [
  {
    path: 'shop',
    component: ShopComponent,
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
    path: '**',
    redirectTo: 'shop/products',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '**',
  },
];
