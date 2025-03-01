import { Component, inject, input } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductImageComponent } from "../../shared/product-image/product-image.component";
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { randomIntFromInterval } from '../../shared/utility/functions';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [ProductImageComponent, RatingModule, FormsModule, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  idProduct = input.required<number>();
  #productsService: ProductsService = inject(ProductsService);
  productDetails = this.#productsService.getSingleProduct(this.idProduct);
  rating = randomIntFromInterval();
}
