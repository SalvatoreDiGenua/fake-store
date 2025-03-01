import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { Button } from 'primeng/button';
import { ProductsService } from '../../services/products.service';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ProductImageComponent } from '../product-image/product-image.component';
import { Product } from '../../models/product';
import { Tooltip } from 'primeng/tooltip';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [ToolbarModule, Button, AutoCompleteModule, ReactiveFormsModule, ProductImageComponent, Tooltip],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  #router: Router = inject(Router)
  routerEvents = toSignal(this.#router.events.pipe(filter(e => e instanceof NavigationEnd)));
  autocompleteFormControl: FormControl = new FormControl<Product>(null);
  #productsService: ProductsService = inject(ProductsService);
  productsList = this.#productsService.getAllProducts();
  filteredProductList: Product[] = [];

  ngOnInit() {
    this.autocompleteFormControl.valueChanges
      .pipe(filter(value => value !== null && typeof value === 'object'))
      .subscribe(this.goIntoProductDetails)
  }

  backToProductList() {
    this.#router.navigate(['products']);
  }

  goIntoProductDetails = (product: Product) => {
    this.#router.navigate(['products', product.id, 'details']);
  }

  completeMethod(autoCompleteCompleteEvent: AutoCompleteCompleteEvent) {
    this.filteredProductList = this.productsList.value().filter(product => product.title.toLowerCase().includes(autoCompleteCompleteEvent.query.toLowerCase()));
  }
}
