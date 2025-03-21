import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
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
  #dialogService: DialogService = inject(DialogService);

  showDialogSearchProducts() {
    this.#dialogService.open(SearchProductsComponent, {
      modal: true,
      width: '60dvw',
      height: '90dvh',
      closeOnEscape: true,
      showHeader: false,
      dismissableMask: true,
    });
  }
}
