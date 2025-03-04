import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { Card } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-checkout',
  imports: [Card, AccordionModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CheckoutComponent {
  @HostBinding('class') class = 'fake-store-checkout';
}
