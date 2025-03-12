import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { PLACEHOLDER_PRODUCT } from '../shared/placeholder/placeholder-product';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  #PRODUCTS_URL = `${environment.BASE_URL}/products`;
  #httpClient: HttpClient = inject(HttpClient);

  getAllProducts(withLoader = true) {
    console.log('#PRODUCTS_URL', this.#PRODUCTS_URL);
    console.log({ environment });

    return httpResource<Product[]>(
      {
        url: this.#PRODUCTS_URL,
        method: 'GET',
        withCredentials: true,
        params: { withLoader },
      },
      {
        defaultValue: [],
      },
    );
  }

  getAllProductsRx(withLoader = true) {
    console.log('#PRODUCTS_URL', this.#PRODUCTS_URL);
    console.log({ environment });
    return this.#httpClient.get<Product[]>(this.#PRODUCTS_URL, {
      withCredentials: true,
      params: { withLoader },
    });
  }

  getSingleProduct(idProduct: Signal<number>, withLoader = false) {
    return rxResource<Product, { idProduct: number }>({
      request: () => ({ idProduct: idProduct() }),
      loader: ({ request }) =>
        this.#httpClient.get<Product>(
          `${this.#PRODUCTS_URL}/${request.idProduct}`,
          {
            withCredentials: true,
            params: { withLoader },
          },
        ),
      defaultValue: PLACEHOLDER_PRODUCT,
    });
  }
}
