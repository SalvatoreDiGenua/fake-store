import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FakeStoreReducers } from '../shared/stores/app.reducers';
import { getTokenFromCookie } from '../shared/utility/fake-store-functions';
import { CookieService } from 'ngx-cookie-service';
import { getUserRemote } from '../shared/stores/user/user.actions';

export const isUserLoggedGuard: CanActivateFn = () => {
  const store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  const router = inject(Router);
  const cookieService: CookieService = inject(CookieService);
  const token = getTokenFromCookie(cookieService);
  if (!token) {
    router.navigateByUrl('login');
    return false;
  }
  store.dispatch(getUserRemote({ token }));
  return true;
};
