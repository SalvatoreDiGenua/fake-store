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
import {
  getUserRemote,
  removeUser,
  setUserGuest,
} from '../../shared/stores/user/user.actions';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { getUser } from '../../shared/stores/user/user.selectors';
import { validateFormGroup } from '../../shared/utility/functions';
import { CookieService } from 'ngx-cookie-service';
import { removeTokenFromCookie } from '../../shared/utility/cookie';
import { LOGIN_GUEST } from '../../models/user';

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
    RouterLink
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
  isUserLogged = toSignal(this.#store.pipe(select(getUser)));
  goToProductsPageEffect = effect(() => {
    if (!this.isUserLogged()) {
      return;
    }
    this.#router.navigateByUrl('shop/products');
  });

  #cookieService: CookieService = inject(CookieService);

  constructor() {
    removeTokenFromCookie(this.#cookieService);
    this.#store.dispatch(removeUser());
  }

  userLogin() {
    validateFormGroup(this.formLogin);
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

  guestLogin() {
    this.formLogin.patchValue({
      username: LOGIN_GUEST.username,
      password: LOGIN_GUEST.password,
    });
    this.#store.dispatch(setUserGuest());
  }

  ngOnDestroy() {
    this.#loginSubscription.unsubscribe();
  }
}
