import { httpResource } from '@angular/common/http';
import { Injectable, resource, Signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Product } from '../models/product';
import { PLACEHOLDER_PRODUCT } from '../shared/placeholder/placeholder-product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  getAllProducts() {
    return httpResource<Product[]>(
      {
        url: `${environment.BASE_URL}/products`,
        method: 'GET',
      },
      {
        defaultValue: []
      }
    );
  }

  getSingleProduct(idProduct: Signal<number>) {
    return resource<Product, { idProduct: number }>({
      request: () => ({ idProduct: idProduct() }),
      loader: ({ request, abortSignal }) =>
        fetch(`${environment.BASE_URL}/products/${request.idProduct}`, { signal: abortSignal })
          .then(response => response.json()),
      defaultValue: PLACEHOLDER_PRODUCT
    })
  }
}