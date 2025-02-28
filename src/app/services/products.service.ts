import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Product } from '../models/product';

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
}
