import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { routes } from './app.routes';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { fakeStoreReducers } from './shared/stores/app.reducers';
import { provideEffects } from '@ngrx/effects';
import { ProductsEffects } from './shared/stores/products/products.effects';
import { httpRequestInterceptor } from './interceptors/http-request.interceptor';
import { MessageService, ConfirmationService } from 'primeng/api';
import { UserEffects } from './shared/stores/user/user.effects';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    ConfirmationService,
    CookieService,
    DialogService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(withInterceptors([httpRequestInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Lara,
        options: {
          prefix: 'fake-store',
          darkModeSelector: 'system',
          cssLayer: false,
        },
      },
    }),
    provideStore(fakeStoreReducers),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      name: 'FakeStore',
    }),
    provideEffects(ProductsEffects, UserEffects),
  ],
};
