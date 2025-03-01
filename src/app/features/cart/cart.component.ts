import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FakeStoreReducers } from '../../shared/stores/app.reducers';
import { getCart } from '../../shared/stores/cart/cart.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [JsonPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  #store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  cartList = toSignal(this.#store.select(getCart));
}
