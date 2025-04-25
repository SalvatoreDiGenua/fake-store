import {
  Component,
  computed,
  HostBinding,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { getUser, isUserGuest } from '../../shared/stores/user/user.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { Card } from 'primeng/card';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { DialogService } from 'primeng/dynamicdialog';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { APP_STORE } from '../../shared/utility/injection-tokens';

@Component({
  selector: 'app-account',
  imports: [HeaderComponent, Card, AvatarComponent, Button, Tooltip],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AccountComponent {
  @HostBinding('class') class = 'host-fake-store-account';
  #store = inject(APP_STORE);
  account = toSignal(this.#store.select(getUser));
  isUserGuest = toSignal(this.#store.select(isUserGuest));
  linkRoboHash = computed(() => {
    if (!this.account()) {
      return '';
    }
    return `https://robohash.org/${this.account().username}`;
  });
  #dialogService: DialogService = inject(DialogService);

  openDialogEditAccount() {
    this.#dialogService.open(EditAccountComponent, {
      modal: true,
      header: 'Edit account',
      width: '800px',
      height: '600px',
      closable: true,
    });
  }
}
