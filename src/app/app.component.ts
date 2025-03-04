import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Store } from '@ngrx/store';
import { FakeStoreReducers } from './shared/stores/app.reducers';
import { getAllProductsRemote } from './shared/stores/products/products.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, Toast, ConfirmDialogModule],
  providers: [MessageService, ConfirmationService],
})
export class AppComponent {
  #store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);

  constructor() {
    this.#store.dispatch(getAllProductsRemote());
  }
}
