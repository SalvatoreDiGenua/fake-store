import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { getCartCount } from '../shared/stores/cart/cart.selectors';
import { map, tap } from 'rxjs';
import { APP_STORE } from '../shared/utility/injection-tokens';

export const hasCartProducts: CanActivateFn = () => {
  const store = inject(APP_STORE);
  const router = inject(Router);
  return store.select(getCartCount).pipe(
    map((count) => count > 0),
    tap(
      (_hasCartProducts) =>
        !_hasCartProducts && router.navigateByUrl('shop/products'),
    ),
  );
};
