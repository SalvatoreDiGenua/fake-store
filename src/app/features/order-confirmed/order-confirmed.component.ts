import {
  Component,
  computed,
  effect,
  HostBinding,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Toolbar } from 'primeng/toolbar';
import { map, timer } from 'rxjs';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { TruckComponent } from '../../shared/components/truck/truck.component';
import { Store } from '@ngrx/store';
import { FakeStoreReducers } from '../../shared/stores/app.reducers';
import { resetCart } from '../../shared/stores/cart/cart.actions';

@Component({
  selector: 'app-order-confirmed',
  imports: [Card, RouterLink, Button, Toolbar, LogoComponent, TruckComponent],
  templateUrl: './order-confirmed.component.html',
  styleUrl: './order-confirmed.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class OrderConfirmedComponent {
  @HostBinding('class') class = 'host-fake-store-order-confirmed';
  timerFinished = toSignal(timer(5000).pipe(map(() => true)));
  isOrderMaking = computed(() => (this.timerFinished() ? false : true));
  #store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  resetCartEffect = effect(() => {
    if (this.isOrderMaking()) {
      return;
    }
    this.#store.dispatch(resetCart());
  });
}
