import {
  Component,
  HostBinding,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { Skeleton } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ProductImageComponent } from '../../shared/components/product-image/product-image.component';
import { Store } from '@ngrx/store';
import { FakeStoreReducers } from '../../shared/stores/app.reducers';
import { getProductsByCategory } from '../../shared/stores/products/products.selectors';
import { rxResource } from '@angular/core/rxjs-interop';
import { Product } from '../../models/product';
import { ProductsBreadcrumbComponent } from '../../shared/components/products-breadcrumb/products-breadcrumb.component';

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
  #store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  productsList = rxResource<Product[], { productCategory: string }>({
    request: () => ({ productCategory: this.productCategory() }),
    loader: ({ request }) =>
      this.#store.select(getProductsByCategory(request.productCategory)),
    defaultValue: [],
  });
  productListPlaceholder = Array(10);
  #router = inject(Router);

  goToProductDetails(idProduct: number) {
    this.#router.navigateByUrl(`products/${idProduct}/details`);
  }
}
