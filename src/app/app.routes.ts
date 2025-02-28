import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: 'products',
    component: AppComponent
  },
  {
    path: '**',
    redirectTo: 'products'
  }
];
