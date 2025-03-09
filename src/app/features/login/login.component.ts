import {
  Component,
  effect,
  HostBinding,
  inject,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Card } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { Button } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { FakeStoreReducers } from '../../shared/stores/app.reducers';
import { getUserRemote } from '../../shared/stores/user/user.actions';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { isUserLogged } from '../../shared/stores/user/user.selectors';

@Component({
  selector: 'app-login',
  imports: [
    Card,
    AvatarModule,
    InputTextModule,
    IftaLabelModule,
    ReactiveFormsModule,
    PasswordModule,
    Button,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnDestroy {
  @HostBinding('class') class = 'host-fake-store-login';
  #store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  formLogin = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  #messageService: MessageService = inject(MessageService);
  #authService: AuthService = inject(AuthService);
  #loginSubscription: Subscription = new Subscription();
  #router: Router = inject(Router);
  isUserLogged = toSignal(this.#store.pipe(select(isUserLogged)));
  getAllProductsRemoteEffect = effect(() => {
    if (!this.isUserLogged()) {
      return;
    }
    this.#router.navigateByUrl('shop/products')
  });

  validateFormLogin() {
    Object.values(this.formLogin.controls).forEach((el) => el.markAsDirty());
  }

  login() {
    this.validateFormLogin();
    if (this.formLogin.invalid) {
      this.#messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Username and Password fields are required',
      });
      return;
    }
    const { username, password } = this.formLogin.getRawValue();
    this.#loginSubscription = this.#authService
      .login(username, password)
      .subscribe((res) =>
        this.#store.dispatch(getUserRemote({ token: res.token })),
      );
  }

  ngOnDestroy() {
    this.#loginSubscription.unsubscribe();
  }
}
