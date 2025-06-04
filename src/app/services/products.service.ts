import { HttpClient } from '@angular/common/http';
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
    return rxResource<Product[], { idProduct: number }>({
      stream: () =>
        this.#httpClient.get<Product[]>(this.#PRODUCTS_URL, {
          withCredentials: false,
          params: { withLoader },
        }),
      defaultValue: [],
    });
  }

  getAllProductsRx(withLoader = true) {
    return this.#httpClient.get<Product[]>(this.#PRODUCTS_URL, {
      withCredentials: false,
      params: { withLoader },
    });
  }

  getSingleProduct(idProduct: Signal<number>, withLoader = false) {
    return rxResource<Product, { idProduct: number }>({
      stream: () =>
        this.#httpClient.get<Product>(`${this.#PRODUCTS_URL}/${idProduct()}`, {
          withCredentials: false,
          params: { withLoader },
        }),
      defaultValue: PLACEHOLDER_PRODUCT,
    });
  }
}
