import { Routes } from '@angular/router';
import { isUserLoggedGuard } from '../../guards/is-user-logged.guard';
import { shopTitleResolver } from './resolver/shop-title.resolver';

export const loginRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products',
  },
  {
    path: '',
    loadComponent: () =>
      import('./shop.component').then((m) => m.ShopComponent),
    children: [
      {
        path: 'products',
        loadComponent: () =>
          import('./components/products/products.component').then(
            (m) => m.ProductsComponent,
          ),
      },
      {
        path: 'products/:idProduct/details',
        loadComponent: () =>
          import('./components/product-details/product-details.component').then(
            (m) => m.ProductDetailsComponent,
          ),
        title: shopTitleResolver,
      },
    ],
    canActivate: [isUserLoggedGuard],
  },
];

export default loginRoutes;
