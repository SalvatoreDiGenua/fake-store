import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FakeStoreReducers } from '../shared/stores/app.reducers';
import { isUserLogged } from '../shared/stores/user/user.selectors';
import { tap } from 'rxjs';

export const isUserLoggedGuard: CanActivateFn = () => {
  const store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  const router = inject(Router);
  return store.select(isUserLogged).pipe(
    tap(
      (isUserLoggedValue) =>
        !isUserLoggedValue && router.navigateByUrl('login'),
    ),
  );
};
