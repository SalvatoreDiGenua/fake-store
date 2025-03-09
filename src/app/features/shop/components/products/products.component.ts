import {
  Component,
  effect,
  HostBinding,
  inject,
  input,
  viewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { Skeleton } from 'primeng/skeleton';
import { Card, CardModule } from 'primeng/card';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { rxResource } from '@angular/core/rxjs-interop';
import { Product } from '../../../../models/product';
import { ProductImageComponent } from '../../../../shared/components/product-image/product-image.component';
import { ProductsBreadcrumbComponent } from '../../../../shared/components/products-breadcrumb/products-breadcrumb.component';
import { FakeStoreReducers } from '../../../../shared/stores/app.reducers';
import { getProductsByCategory } from '../../../../shared/stores/products/products.selectors';
import {
  isNullOrUndefined,
  scrollIntoView,
} from '../../../../shared/utility/functions';

@Component({
  selector: 'app-products',
  imports: [
    CardModule,
    Skeleton,
    CurrencyPipe,
    ProductImageComponent,
    ProductsBreadcrumbComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent {
  @HostBinding('class') class = 'host-fake-store-products';
  productCategory = input('');
  productsCardList = viewChildren<Card>(Card);
  #store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  productsList = rxResource<Product[], { productCategory: string }>({
    request: () => ({ productCategory: this.productCategory() }),
    loader: ({ request }) =>
      this.#store.select(getProductsByCategory(request.productCategory)),
    defaultValue: [],
  });
  productListPlaceholder = Array(10);
  #router = inject(Router);

  scrollToProduct = effect(() => {
    if (
      this.productsList.isLoading() ||
      !this.productsCardList() ||
      this.productsCardList().length === 0
    ) {
      return;
    }

    const idProductToScroll = getIdProductFromLocalStorage();
    if (isNullOrUndefined(idProductToScroll)) {
      return;
    }
    const cardProductToScroll = this.productsCardList().find(
      (x) => x.el.nativeElement.id === `product-${idProductToScroll}`,
    );
    if (!cardProductToScroll) {
      return;
    }
    setTimeout(() => {
      scrollIntoView(cardProductToScroll.el.nativeElement, true);
      removeIdProductFromLocalStorage();
    });
  });

  goToProductDetails(idProduct: number) {
    this.#router.navigateByUrl(`shop/products/${idProduct}/details`);
  }
}
function getIdProductFromLocalStorage() {
  throw new Error('Function not implemented.');
}

function removeIdProductFromLocalStorage() {
  throw new Error('Function not implemented.');
}

