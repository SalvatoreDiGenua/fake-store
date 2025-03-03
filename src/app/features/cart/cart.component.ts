import {
  Component,
  HostBinding,
  inject,
  signal,
  viewChild,
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
import {
  addProductToCart,
  removeAllProductFromCart,
  removeSingleProductFromCart,
} from '../../shared/stores/cart/cart.actions';
import { ProductImageComponent } from '../../shared/components/product-image/product-image.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CurrencyPipe } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { Popover, PopoverModule } from 'primeng/popover';
import { ItemCart } from '../../models/itemCart';

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
    PopoverModule,
    Popover,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CartComponent {
  @HostBinding('class') class = 'host-fake-store-cart';
  popoverRef = viewChild(Popover);
  #store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  cartList = toSignal(this.#store.select(getCartGrouped));
  cartListCount = toSignal(this.#store.select(getCartCount));
  cartTotalToSpend = toSignal(this.#store.select(getCartTotalToSpend));
  #messageService: MessageService = inject(MessageService);
  #confirmationService: ConfirmationService = inject(ConfirmationService);
  cartItemPopover = signal<ItemCart>(null);

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
        this.#store.dispatch(removeAllProductFromCart({ product }));
        this.#messageService.add({
          severity: 'info',
          summary: 'Success',
          detail: `${product.title} removed from cart`,
        });
      },
    });
  }

  showPopoverItemCartCount(event: Event, itemCart: ItemCart) {
    this.cartItemPopover.set(itemCart);
    this.popoverRef().toggle(event);
  }

  decrementProductCount(itemCart: ItemCart) {
    const newItemCart = structuredClone(itemCart);
    this.#store.dispatch(removeSingleProductFromCart({ product: newItemCart }));
  }

  incrementProductCount(itemCart: ItemCart) {
    const newItemCart = structuredClone(itemCart);
    this.#store.dispatch(addProductToCart({ product: newItemCart }));
  }
}
