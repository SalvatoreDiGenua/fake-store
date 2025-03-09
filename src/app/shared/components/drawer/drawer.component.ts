import {
  Component,
  computed,
  inject,
  signal,
  Signal,
  ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { select, Store } from '@ngrx/store';
import { TreeNode, PrimeIcons, ConfirmationService } from 'primeng/api';
import { getProductCategories } from '../../stores/products/products.selectors';
import { FakeStoreReducers } from '../../stores/app.reducers';
import { DrawerModule } from 'primeng/drawer';
import { TreeModule } from 'primeng/tree';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { Button } from 'primeng/button';
import { AuthService } from '../../../services/auth.service';
import { getUser } from '../../stores/user/user.selectors';

@Component({
  selector: 'app-drawer',
  imports: [DrawerModule, TreeModule, RouterLink, LogoComponent, Button],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DrawerComponent {
  visible = signal(false);
  #store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  #authService: AuthService = inject(AuthService);
  #confirmationService: ConfirmationService = inject(ConfirmationService);
  productCategories = toSignal(this.#store.pipe(select(getProductCategories)));
  treeNodes: Signal<TreeNode[]> = computed(() => {
    const _treeNodes: TreeNode<{
      url: string;
      queryParams?: Record<string, string>;
    }>[] = [];
    _treeNodes.push({
      label: 'Product categories',
      icon: PrimeIcons.SHOPPING_BAG,
      type: 'url',
      data: { url: '/products' },
      children: this.productCategories().map((el) => ({
        label: el,
        type: 'url',
        data: { url: '/products', queryParams: { productCategory: el } },
        icon: PrimeIcons.ASTERISK,
      })),
    });
    _treeNodes.push({
      label: 'Cart',
      icon: PrimeIcons.SHOPPING_CART,
      type: 'url',
      data: { url: '/cart' },
    });
    return _treeNodes;
  });
  user = toSignal(this.#store.select(getUser));

  toggleVisible(value: boolean) {
    this.visible.set(value);
  }

  logout(event: Event) {
    this.#confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to logout?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-sign-out',
      rejectButtonProps: {
        label: 'No',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Yes',
      },
      accept: () => this.#authService.logout(),
    });
  }
}
