import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { validateFormGroup } from '../../shared/utility/functions';

@Component({
  selector: 'app-sign-up',
  imports: [
    Card,
    AvatarModule,
    InputTextModule,
    IftaLabelModule,
    ReactiveFormsModule,
    PasswordModule,
    Button,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SignUpComponent {
  @HostBinding('class') class = 'host-fake-store-signup';

  formSignUp = new FormGroup({
    username: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  register() {
    validateFormGroup(this.formSignUp);
  }
}
