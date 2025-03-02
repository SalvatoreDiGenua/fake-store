import { Component, input } from '@angular/core';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrl: './product-image.component.scss',
})
export class ProductImageComponent {
  urlImageProduct = input.required<string>();
  sizeImageProduct = input<number>(200);
  borderRadiusImageProduct = input<string>(null);
}
