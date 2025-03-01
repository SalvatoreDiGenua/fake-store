import { Component, inject } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [ToolbarModule, InputTextModule, IconField, InputIcon, Button],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  #router: Router = inject(Router)
  routerEvents = toSignal(this.#router.events.pipe(filter(e => e instanceof NavigationEnd)));

  backToProductList() {
    this.#router.navigate(['products']);
  }
}
