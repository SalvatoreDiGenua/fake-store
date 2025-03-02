import {
  Component,
  HostBinding,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { Skeleton } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ProductImageComponent } from '../../shared/components/product-image/product-image.component';
import { Store } from '@ngrx/store';
import { FakeStoreReducers } from '../../shared/stores/app.reducers';
import { getProducts } from '../../shared/stores/products/products.selectors';
import { toSignal } from '@angular/core/rxjs-interop';

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
  productsList = toSignal(this.#store.select(getProducts));
  productListPlaceholder = Array(10);
  #router = inject(Router);

  goToProductDetails(idProduct: number) {
    this.#router.navigateByUrl(`products/${idProduct}/details`);
  }
}
