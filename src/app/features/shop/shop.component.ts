import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ButtonCartComponent } from '../../shared/components/button-cart/button-cart.component';

@Component({
  selector: 'app-shop',
  imports: [RouterOutlet, HeaderComponent, ButtonCartComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  #router = inject(Router);
  constructor() {
    this.goToProducts();
  }

  goToProducts() {
    const url = this.#router.url;
    if (url === '/shop') {
      this.#router.navigateByUrl('shop/products');
    }
  }
}
