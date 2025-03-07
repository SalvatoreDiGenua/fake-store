import { CanActivateFn, Router } from '@angular/router';
import { FakeStoreReducers } from '../shared/stores/app.reducers';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCartCount } from '../shared/stores/cart/cart.selectors';
import { map, tap } from 'rxjs';

export const orderConfirmedGuard: CanActivateFn = () => {
  const store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  const router = inject(Router);
  return store.select(getCartCount).pipe(
    map((count) => count > 0),
    tap(
      (cartHasProduct) =>
        !cartHasProduct && router.navigateByUrl('shop/products'),
    ),
  );
};
