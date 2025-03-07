import {
  Component,
  HostBinding,
  inject,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Card } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { Button } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { Toolbar } from 'primeng/toolbar';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { AddressShippingComponent } from './components/address-shipping/address-shipping.component';

@Component({
  selector: 'app-checkout',
  imports: [
    Card,
    AccordionModule,
    Button,
    RouterLink,
    Toolbar,
    LogoComponent,
    AddressShippingComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CheckoutComponent {
  @HostBinding('class') class = 'fake-store-checkout';
  addressShippingRef = viewChild(AddressShippingComponent);
  #router = inject(Router);

  confirmOrder() {
    Object.values(
      this.addressShippingRef().formAddressShipping.controls,
    ).forEach((el) => el.markAsDirty());

    if (this.addressShippingRef().formAddressShipping.invalid) {
      return;
    }
    this.#router.navigateByUrl('/order-confirmed');
  }
}
