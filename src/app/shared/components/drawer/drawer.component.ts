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
import { TreeNode, PrimeIcons } from 'primeng/api';
import { getProductCategories } from '../../stores/products/products.selectors';
import { FakeStoreReducers } from '../../stores/app.reducers';
import { DrawerModule } from 'primeng/drawer';
import { TreeModule } from 'primeng/tree';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-drawer',
  imports: [DrawerModule, TreeModule, RouterLink, LogoComponent],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DrawerComponent {
  visible = signal(false);
  #store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
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

  toggleVisible(value: boolean) {
    this.visible.set(value);
  }
}
