import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { select } from '@ngrx/store';
import { getAllProductsRemote } from './shared/stores/products/products.actions';
import { getUser } from './shared/stores/user/user.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { APP_STORE } from './shared/utility/injection-tokens';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, Toast, ConfirmDialogModule, LoaderComponent],
})
export class AppComponent {
  #store = inject(APP_STORE);
  isUserLogged = toSignal(this.#store.pipe(select(getUser)));
  getAllProductsRemoteEffect = effect(() => {
    if (!this.isUserLogged()) {
      return;
    }
    this.#store.dispatch(getAllProductsRemote());
  });
}
