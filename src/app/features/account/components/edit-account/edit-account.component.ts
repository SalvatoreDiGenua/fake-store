import {
  Component,
  effect,
  HostBinding,
  inject,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PrimeIcons } from 'primeng/api';
import { Button } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TabsModule } from 'primeng/tabs';
import { getUser } from '../../../../shared/stores/user/user.selectors';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../../../services/user.service';
import { UpdateUserPayload } from '../../../../models/user';
import { Subscription } from 'rxjs';
import { APP_STORE } from '../../../../shared/utility/injection-tokens';

@Component({
  selector: 'app-edit-account',
  imports: [
    TabsModule,
    Button,
    IftaLabelModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EditAccountComponent implements OnDestroy {
  @HostBinding('class') class = 'host-fake-store-edit-account';
  tabsEditAccount = [
    {
      label: 'Master data',
      value: 0,
      icon: PrimeIcons.USER,
    },
    {
      label: 'Address',
      value: 1,
      icon: PrimeIcons.HOME,
    },
  ];
  #dynamicDialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  #store = inject(APP_STORE);
  account = toSignal(this.#store.select(getUser));
  formEditAccount = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
  });
  #userServices: UserService = inject(UserService);
  #updateUserSubscription: Subscription = new Subscription();

  updateFormEditAccount = effect(() => {
    if (!this.account()) {
      return;
    }
    this.formEditAccount.patchValue(this.account());
  });

  onClose() {
    this.#dynamicDialogRef.close();
  }

  updateUser() {
    const payload: UpdateUserPayload = this.formEditAccount.getRawValue();
    this.#updateUserSubscription = this.#userServices
      .updateUser(this.account().id, payload)
      .subscribe();
  }

  ngOnDestroy() {
    this.#updateUserSubscription.unsubscribe();
  }
}
