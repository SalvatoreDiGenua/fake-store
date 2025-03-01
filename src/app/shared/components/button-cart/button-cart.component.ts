import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Button } from 'primeng/button';
import { FakeStoreReducers } from '../../stores/app.reducers';
import { getCartCount } from '../../stores/cart/cart.selectors';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-button-cart',
  imports: [Button],
  templateUrl: './button-cart.component.html',
  styleUrl: './button-cart.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ButtonCartComponent {
  #store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  cartCount = toSignal(this.#store.select(getCartCount));
} 
