import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
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
import { Button } from 'primeng/button';

@Component({
  selector: 'app-drawer',
  imports: [DrawerModule, TreeModule, Button],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DrawerComponent {
  visible = signal(false);
  #store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  productCategories = toSignal(this.#store.pipe(select(getProductCategories)));
  treeNodes: Signal<TreeNode[]> = computed(() => {
    const _treeNodes: TreeNode[] = [];
    _treeNodes.push({
      label: 'Product categories',
      icon: PrimeIcons.SHOPPING_BAG,
      type: 'default',
      children: this.productCategories().map((el) => ({
        label: el,
        type: 'url',
        data: el,
        icon: PrimeIcons.ASTERISK,
      })),
    });
    return _treeNodes;
  });

  toggleVisible(value: boolean) {
    this.visible.set(value);
  }

  nodeUrlClick(node: TreeNode) {
    console.log(node);
  }
}
