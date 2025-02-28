import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Skeleton } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CardModule, Skeleton, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent {
  #productsService: ProductsService = inject(ProductsService);
  productsList = this.#productsService.getAllProducts();
  productListPlaceholder = Array(10);
}
