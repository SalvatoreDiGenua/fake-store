import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Button } from 'primeng/button';
import { getCartCount } from '../../stores/cart/cart.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { APP_STORE } from '../../utility/injection-tokens';

@Component({
  selector: 'app-button-cart',
  imports: [Button],
  templateUrl: './button-cart.component.html',
  styleUrl: './button-cart.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ButtonCartComponent {
  #store = inject(APP_STORE);
  cartCount = toSignal(this.#store.select(getCartCount));
  #router: Router = inject(Router);
  routerEvents = toSignal(
    this.#router.events.pipe(filter((e) => e instanceof NavigationEnd)),
  );

  goToCart() {
    this.#router.navigate(['cart']);
  }
}
