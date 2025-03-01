import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./features/products/products.component').then(m => m.ProductsComponent)
  },
  {
    path: 'products/:idProduct/details',
    loadComponent: () => import('./features/product-details/product-details.component').then(m => m.ProductDetailsComponent),
    data: {
      showBackToListProduct: true
    }
  },
  {
    path: '**',
    redirectTo: 'products'
  }
];
