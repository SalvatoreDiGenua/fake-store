import {
  Component,
  computed,
  HostBinding,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { FakeStoreReducers } from '../../shared/stores/app.reducers';
import { getUser, isUserGuest } from '../../shared/stores/user/user.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { Card } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-account',
  imports: [HeaderComponent, Card, AvatarModule, Button, Tooltip],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AccountComponent {
  @HostBinding('class') class = 'host-fake-store-account';
  #store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  account = toSignal(this.#store.select(getUser));
  isUserGuest = toSignal(this.#store.select(isUserGuest));
  linkRoboHash = computed(() => {
    if (!this.account()) {
      return '';
    }
    return `https://robohash.org/${this.account().username}`;
  });
}
