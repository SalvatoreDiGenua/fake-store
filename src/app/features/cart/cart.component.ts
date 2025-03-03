import {
  Component,
  HostBinding,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { FakeStoreReducers } from '../../shared/stores/app.reducers';
import {
  getCartCount,
  getCartGrouped,
  getCartTotalToSpend,
} from '../../shared/stores/cart/cart.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataViewModule } from 'primeng/dataview';
import { Product } from '../../models/product';
import { removeProductFromCart } from '../../shared/stores/cart/cart.actions';
import { ProductImageComponent } from '../../shared/components/product-image/product-image.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CurrencyPipe } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [
    DataViewModule,
    ProductImageComponent,
    CurrencyPipe,
    DividerModule,
    Card,
    Button,
    RouterLink,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CartComponent {
  @HostBinding('class') class = 'host-fake-store-cart';
  #store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  cartList = toSignal(this.#store.select(getCartGrouped));
  cartListCount = toSignal(this.#store.select(getCartCount));
  cartTotalToSpend = toSignal(this.#store.select(getCartTotalToSpend));
  #messageService: MessageService = inject(MessageService);
  #confirmationService: ConfirmationService = inject(ConfirmationService);

  removeProductFromCart(event: Event, product: Product) {
    this.#confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Save',
      },
      accept: () => {
        this.#store.dispatch(removeProductFromCart({ product }));
        this.#messageService.add({
          severity: 'info',
          summary: 'Success',
          detail: `${product.title} removed from cart`,
        });
      },
    });
  }
}
