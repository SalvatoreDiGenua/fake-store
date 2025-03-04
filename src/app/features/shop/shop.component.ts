import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ButtonCartComponent } from '../../shared/components/button-cart/button-cart.component';

@Component({
  selector: 'app-shop',
  imports: [RouterOutlet, HeaderComponent, ButtonCartComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
}
