import {
  Component,
  HostBinding,
  inject,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
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
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { NewUsersPayload } from '../../models/user';

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
    RouterLink,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SignUpComponent implements OnDestroy {
  @HostBinding('class') class = 'host-fake-store-signup';
  #messageService: MessageService = inject(MessageService);
  #userService: UserService = inject(UserService);
  #addNewUserSubscription: Subscription = new Subscription();

  formSignUp = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  register() {
    validateFormGroup(this.formSignUp);
    if (this.formSignUp.invalid) {
      this.#messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'All fields are required!',
      });
      return;
    }

    const newUsersPayload: NewUsersPayload = this.formSignUp.getRawValue();
    this.#addNewUserSubscription = this.#userService
      .addNewUser(newUsersPayload)
      .subscribe();
  }

  ngOnDestroy() {
    this.#addNewUserSubscription.unsubscribe();
  }
}
