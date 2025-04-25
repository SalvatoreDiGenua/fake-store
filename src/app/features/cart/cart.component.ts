import {
  Component,
  HostBinding,
  inject,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  getCartCount,
  getCartGrouped,
  getCartTotalToSpend,
  getSingleItemCart,
} from '../../shared/stores/cart/cart.selectors';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
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
import { HeaderComponent } from '../../shared/components/header/header.component';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { APP_STORE } from '../../shared/utility/injection-tokens';

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
    HeaderComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CartComponent {
  @HostBinding('class') class = 'host-fake-store-cart';
  popoverRef = viewChild(Popover);
  #store = inject(APP_STORE);
  cartList = toSignal(this.#store.select(getCartGrouped));
  cartListCount = toSignal(this.#store.select(getCartCount));
  cartTotalToSpend = toSignal(this.#store.select(getCartTotalToSpend));
  #messageService: MessageService = inject(MessageService);
  #confirmationService: ConfirmationService = inject(ConfirmationService);
  idCartItemPopover = signal<number>(-1);
  cartItemPopover = rxResource({
    request: () => ({ idCartItemPopover: this.idCartItemPopover() }),
    loader: ({ request }) =>
      this.#store.select(getSingleItemCart(request.idCartItemPopover)),
    defaultValue: null,
  });
  #localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor() {
    this.#localStorageService.removeIdProductFromLocalStorage();
  }

  removeProductFromCart(event: Event, product: Product) {
    this.popoverRef().hide();
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

  showPopoverItemCartCount(event: Event, idItemCart: number) {
    this.idCartItemPopover.set(idItemCart);
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
