import { CanActivateFn, Router } from '@angular/router';
import { FakeStoreReducers } from '../shared/stores/app.reducers';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCartCount } from '../shared/stores/cart/cart.selectors';
import { filter, map, tap } from 'rxjs';

export const orderConfirmedGuard: CanActivateFn = () => {
  const store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  return store.select(getCartCount).pipe(
    map((count) => count === 0),
    filter(Boolean),
    tap(() => {
      const router = inject(Router);
      router.navigateByUrl('/shop');
    }),
  );
};
