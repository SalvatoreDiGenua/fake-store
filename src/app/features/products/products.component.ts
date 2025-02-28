import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Skeleton } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-products',
  imports: [CardModule, Skeleton, Button],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  #productsService: ProductsService = inject(ProductsService);
  productsList = this.#productsService.getAllProducts();
  productListPlaceholder = Array(10);
}
