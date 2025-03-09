import {
  Component,
  HostBinding,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { FakeStoreReducers } from '../../shared/stores/app.reducers';
import { getUser } from '../../shared/stores/user/user.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { Card } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FieldComponent } from './components/field/field.component';

@Component({
  selector: 'app-account',
  imports: [HeaderComponent, Card, AvatarModule, FieldComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AccountComponent {
  @HostBinding('class') class = 'host-fake-store-account';
  #store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  account = toSignal(this.#store.select(getUser));
}
