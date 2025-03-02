import { Component } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonCartComponent } from './shared/components/button-cart/button-cart.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    HeaderComponent,
    Toast,
    ButtonCartComponent,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class AppComponent {}
