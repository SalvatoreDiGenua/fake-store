import { Routes } from '@angular/router';
import { isUserLoggedGuard } from '../../guards/is-user-logged.guard';

export const shopRoutes: Routes = [
  {
    path: 'shop',
    pathMatch: 'full',
    redirectTo: 'shop/products',
  },
  {
    path: 'shop',
    loadComponent: () =>
      import('./shop.component').then((m) => m.ShopComponent),
    children: [
      {
        path: 'products',
        loadComponent: () =>
          import('./components/products/products.component').then(
            (m) => m.ProductsComponent,
          ),
        canActivate: [isUserLoggedGuard],
      },
      {
        path: 'products/:idProduct/details',
        loadComponent: () =>
          import('./components/product-details/product-details.component').then(
            (m) => m.ProductDetailsComponent,
          ),
        canActivate: [isUserLoggedGuard],
      },
    ],
  },
];
