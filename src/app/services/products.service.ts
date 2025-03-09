import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, resource, Signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Product } from '../models/product';
import { PLACEHOLDER_PRODUCT } from '../shared/placeholder/placeholder-product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  #PRODUCTS_URL = `${environment.BASE_URL}/products`;
  #httpClient: HttpClient = inject(HttpClient);

  getAllProducts() {
    return httpResource<Product[]>(
      {
        url: this.#PRODUCTS_URL,
        method: 'GET',
        withCredentials: true,
      },
      {
        defaultValue: [],
      },
    );
  }

  getAllProductsRx() {
    return this.#httpClient.get<Product[]>(this.#PRODUCTS_URL, {
      withCredentials: true,
    });
  }

  getSingleProduct(idProduct: Signal<number>) {
    return resource<Product, { idProduct: number }>({
      request: () => ({ idProduct: idProduct() }),
      loader: ({ request, abortSignal }) =>
        fetch(`${this.#PRODUCTS_URL}/${request.idProduct}`, {
          signal: abortSignal,
          credentials: 'include',
        }).then((response) => response.json()),
      defaultValue: PLACEHOLDER_PRODUCT,
    });
  }
}
