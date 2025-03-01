import { Component, inject, input } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductImageComponent } from "../../shared/components/product-image/product-image.component";
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Button } from 'primeng/button';
import { Product } from '../../models/product';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-details',
  imports: [ProductImageComponent, RatingModule, FormsModule, CurrencyPipe, Button],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  idProduct = input.required<number>();
  #productsService: ProductsService = inject(ProductsService);
  productDetails = this.#productsService.getSingleProduct(this.idProduct);
  #messageService: MessageService = inject(MessageService);

  addProductToCart(productDetailsValue: Product) {
    this.#messageService.add({ severity: 'success', summary: 'Success', detail: `${productDetailsValue.title} added to cart` });
  }
}
