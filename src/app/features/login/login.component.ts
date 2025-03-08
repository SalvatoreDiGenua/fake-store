import {
  Component,
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
  formLogin = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  #messageService: MessageService = inject(MessageService);
  #authService: AuthService = inject(AuthService);
  #loginSubscription: Subscription = new Subscription();

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
      .subscribe((res) => console.log(res));
  }

  ngOnDestroy() {
    this.#loginSubscription.unsubscribe();
  }
}
