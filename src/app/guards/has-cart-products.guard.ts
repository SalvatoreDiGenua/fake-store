import { CanActivateFn, Router } from '@angular/router';
import { FakeStoreReducers } from '../shared/stores/app.reducers';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCartCount } from '../shared/stores/cart/cart.selectors';
import { map, tap } from 'rxjs';

export const hasCartProducts: CanActivateFn = () => {
  const store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  const router = inject(Router);
  return store.select(getCartCount).pipe(
    map((count) => count > 0),
    tap(
      (_hasCartProducts) =>
        !_hasCartProducts && router.navigateByUrl('shop/products'),
    ),
  );
};
