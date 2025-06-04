import {
  Component,
  HostBinding,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { getProductsByQuery } from '../../stores/products/products.selectors';
import { Product } from '../../../models/product';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductImageComponent } from '../product-image/product-image.component';
import { TooltipModule } from 'primeng/tooltip';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { LocalStorageService } from '../../services/local-storage.service';
import { APP_STORE } from '../../utility/injection-tokens';

@Component({
  selector: 'app-search-products',
  imports: [
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
    DataViewModule,
    ProductImageComponent,
    TooltipModule,
    DividerModule,
    ButtonModule,
  ],
  templateUrl: './search-products.component.html',
  styleUrl: './search-products.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SearchProductsComponent implements OnInit {
  @HostBinding('class') class = 'host-fake-store-search-products';

  #dynamicDialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  #store = inject(APP_STORE);
  #router: Router = inject(Router);
  #localStorageService: LocalStorageService = inject(LocalStorageService);

  querySearchProduct = signal('');
  filteredProductList = rxResource({
    stream: () =>
      this.#store.select(getProductsByQuery(this.querySearchProduct())),
    defaultValue: [],
  });
  recentSearchProducts = signal<string[]>([]);

  ngOnInit() {
    this.refreshRecentSearchProducts();
  }

  goIntoProductDetails(product: Product) {
    this.addQueryIntoLocalStorage();
    this.#router.navigateByUrl(`shop/products/${product.id}/details`);
    this.closeDialogSearchProducts();
  }

  refreshRecentSearchProducts() {
    this.recentSearchProducts.set(
      this.#localStorageService.getQueriesFromLocalStorage(),
    );
  }

  addQueryIntoLocalStorage() {
    const currentQueries =
      this.#localStorageService.getQueriesFromLocalStorage();
    currentQueries.push(this.querySearchProduct());
    this.#localStorageService.setQueriesIntoLocalStorage(currentQueries);
    this.refreshRecentSearchProducts();
  }

  removeQueryFromLocalStorage(query: string) {
    let currentQueries = this.#localStorageService.getQueriesFromLocalStorage();
    currentQueries = currentQueries.filter((el) => el !== query);
    this.#localStorageService.setQueriesIntoLocalStorage(currentQueries);
    this.refreshRecentSearchProducts();
  }

  closeDialogSearchProducts() {
    this.#dynamicDialogRef.close();
  }
}
