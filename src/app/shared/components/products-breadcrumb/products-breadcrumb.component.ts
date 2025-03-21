import { Component, computed, input } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-products-breadcrumb',
  imports: [BreadcrumbModule],
  templateUrl: './products-breadcrumb.component.html',
  styleUrl: './products-breadcrumb.component.scss',
})
export class ProductsBreadcrumbComponent {
  productCategory = input('');
  itemsBreadcrumb = computed<MenuItem[]>(() => {
    const _itemsBreadcrumb: MenuItem[] = [];
    if (this.productCategory()) {
      _itemsBreadcrumb.push({
        label: this.productCategory(),
        routerLink: `shop/products`,
        queryParams: { productCategory: this.productCategory() },
      });
    }
    return _itemsBreadcrumb;
  });
  homeBreadcrumb: MenuItem = {
    label: 'All products',
    icon: PrimeIcons.SHOPPING_BAG,
    routerLink: '/shop',
  };
}
