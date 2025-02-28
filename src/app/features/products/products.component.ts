import { Component, HostBinding, inject, ViewEncapsulation } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Skeleton } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ProductImageComponent } from '../../shared/product-image/product-image.component';

@Component({
  selector: 'app-products',
  imports: [CardModule, Skeleton, CurrencyPipe, ProductImageComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent {
  @HostBinding('class') class = 'host-fake-store-products';
  #productsService: ProductsService = inject(ProductsService);
  productsList = this.#productsService.getAllProducts();
  productListPlaceholder = Array(10);
  #router = inject(Router);

  goToProductDetails(idProduct: number) {
    this.#router.navigateByUrl(`products/${idProduct}/details`);
  }
}
