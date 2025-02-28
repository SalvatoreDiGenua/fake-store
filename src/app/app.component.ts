import { Component } from '@angular/core';
import { HeaderComponent } from "./features/header/header.component";
import { ProductsComponent } from './features/products/products.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, ProductsComponent]
})
export class AppComponent {
}
