import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
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
export class LoginComponent {
  @HostBinding('class') class = 'host-fake-store-login';
  formLogin = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  validateFormLogin() {
    Object.values(this.formLogin.controls).forEach((el) => el.markAsDirty());
  }

  login() {
    this.validateFormLogin();
  }
}
