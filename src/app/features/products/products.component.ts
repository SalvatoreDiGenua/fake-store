import { Component, effect, HostBinding, inject, ViewEncapsulation } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Skeleton } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ProductImageComponent } from '../../shared/product-image/product-image.component';
import { Store } from '@ngrx/store';
import { FakeStoreReducers } from '../../shared/stores/app.reducers';
import { updateAllProducts } from '../../shared/stores/products/products.actions';

@Component({
  selector: 'app-products',
  imports: [CardModule, Skeleton, CurrencyPipe, ProductImageComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent {
  @HostBinding('class') class = 'host-fake-store-products';
  #store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  #productsService: ProductsService = inject(ProductsService);
  productsList = this.#productsService.getAllProducts();
  productListPlaceholder = Array(10);
  #router = inject(Router);

  updateStoreProducts = effect(() => {
    if (this.productsList.isLoading()) {
      return;
    }
    this.#store.dispatch(updateAllProducts({ products: this.productsList.value() }));
  })

  goToProductDetails(idProduct: number) {
    this.#router.navigateByUrl(`products/${idProduct}/details`);
  }
}
