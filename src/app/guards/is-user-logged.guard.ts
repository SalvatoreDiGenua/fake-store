import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FakeStoreReducers } from '../shared/stores/app.reducers';
import { getTokenFromCookie } from '../shared/utility/fake-store-functions';
import { CookieService } from 'ngx-cookie-service';
import { getUserRemote } from '../shared/stores/user/user.actions';
import { getUser } from '../shared/stores/user/user.selectors';
import { firstValueFrom } from 'rxjs';

export const isUserLoggedGuard: CanActivateFn = async () => {
  const store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  const router = inject(Router);
  const cookieService: CookieService = inject(CookieService);
  const token = getTokenFromCookie(cookieService);
  const user = await firstValueFrom(store.select(getUser));
  if (!token) {
    router.navigateByUrl('login');
    return false;
  }
  if (!user) {
    store.dispatch(getUserRemote({ token }));
  }
  return true;
};
