import { Component, effect, inject, input } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { ProductImageComponent } from '../../../../shared/components/product-image/product-image.component';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Button } from 'primeng/button';
import { Product } from '../../../../models/product';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { FakeStoreReducers } from '../../../../shared/stores/app.reducers';
import { addProductToCart } from '../../../../shared/stores/cart/cart.actions';
import { Skeleton } from 'primeng/skeleton';
import { FieldsetModule } from 'primeng/fieldset';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';

@Component({
  selector: 'app-product-details',
  imports: [
    ProductImageComponent,
    RatingModule,
    FormsModule,
    CurrencyPipe,
    Button,
    Skeleton,
    FieldsetModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  idProduct = input.required<number>();
  #productsService: ProductsService = inject(ProductsService);
  productDetails = this.#productsService.getSingleProduct(this.idProduct);
  #store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  #messageService: MessageService = inject(MessageService);
  #localStorageService: LocalStorageService = inject(LocalStorageService);

  setCurrentIdProductToScroll = effect(() => {
    if (this.productDetails.isLoading()) {
      return;
    }
    this.#localStorageService.setIdProductIntoLocalStorage(
      this.productDetails.value().id.toString(),
    );
  });

  addProductToCart(productDetails: Product) {
    this.#store.dispatch(addProductToCart({ product: productDetails }));
    this.#messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `${productDetails.title} added to cart`,
    });
  }
}
