import {
  Component,
  HostBinding,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { Card } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { Button } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { Toolbar } from 'primeng/toolbar';
import { LogoComponent } from '../../shared/components/logo/logo.component';

@Component({
  selector: 'app-checkout',
  imports: [Card, AccordionModule, Button, RouterLink, Toolbar, LogoComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CheckoutComponent {
  @HostBinding('class') class = 'fake-store-checkout';
  #router = inject(Router);

  confirmOrder() {
    this.#router.navigateByUrl('/order-confirmed');
  }
}
