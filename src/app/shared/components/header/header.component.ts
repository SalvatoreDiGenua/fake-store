import {
  Component,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, firstValueFrom } from 'rxjs';
import { Button } from 'primeng/button';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { ProductImageComponent } from '../product-image/product-image.component';
import { Product } from '../../../models/product';
import { Tooltip } from 'primeng/tooltip';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { FakeStoreReducers } from '../../stores/app.reducers';
import {
  getProducts,
  getProductsByQuery,
} from '../../stores/products/products.selectors';
import { DrawerComponent } from '../drawer/drawer.component';

@Component({
  selector: 'app-header',
  imports: [
    ToolbarModule,
    Button,
    AutoCompleteModule,
    ReactiveFormsModule,
    ProductImageComponent,
    Tooltip,
    DrawerComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  #router: Router = inject(Router);
  routerEvents = toSignal(
    this.#router.events.pipe(filter((e) => e instanceof NavigationEnd)),
  );
  autocompleteFormControl: FormControl = new FormControl<Product>(null);
  #store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  products = toSignal(this.#store.pipe(select(getProducts)));
  filteredProductList = signal<Product[]>([]);

  ngOnInit() {
    this.autocompleteFormControl.valueChanges
      .pipe(filter((value) => value !== null && typeof value === 'object'))
      .subscribe(this.goIntoProductDetails);
  }

  backToProductList() {
    this.#router.navigateByUrl('shop/products');
  }

  goIntoProductDetails = (product: Product) => {
    this.#router.navigateByUrl(`shop/products/${product.id}/details`);
  };

  async completeMethod(autoCompleteCompleteEvent: AutoCompleteCompleteEvent) {
    this.filteredProductList.set(
      await firstValueFrom(
        this.#store.select(getProductsByQuery(autoCompleteCompleteEvent.query)),
      ),
    );
  }
}
