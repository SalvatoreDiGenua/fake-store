import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { Button } from 'primeng/button';
import { DrawerComponent } from '../drawer/drawer.component';
import { LogoComponent } from '../logo/logo.component';
import { SearchProductsComponent } from '../search-products/search-products.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-header',
  imports: [ToolbarModule, Button, DrawerComponent, LogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  #router: Router = inject(Router);
  #dialogService: DialogService = inject(DialogService);

  isBackToListProductVisible = toSignal(
    this.#router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(
        (routerEvents) =>
          routerEvents?.url.includes('account') ||
          routerEvents?.url.includes('details') ||
          routerEvents?.url.includes('cart'),
      ),
    ),
  );

  backToProductList() {
    this.#router.navigateByUrl('shop/products');
  }

  showDialogSearchProducts() {
    this.#dialogService.open(SearchProductsComponent, {
      modal: true,
      width: '60dvw',
      height: '90dvh',
      closeOnEscape: true,
      showHeader: false,
      dismissableMask: true
    });
  }
}
