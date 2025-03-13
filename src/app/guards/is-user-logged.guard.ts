import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FakeStoreReducers } from '../shared/stores/app.reducers';
import {
  getUserGuest,
  getUserRemote,
} from '../shared/stores/user/user.actions';
import { getUser, isUserGuest } from '../shared/stores/user/user.selectors';
import { firstValueFrom } from 'rxjs';
import { USER_GUEST_COOKIE } from '../models/user';
import { CookieService } from '../shared/services/cookie.service';

export const isUserLoggedGuard: CanActivateFn = async () => {
  const store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  const router = inject(Router);
  const cookieService: CookieService = inject(CookieService);
  const token = cookieService.getTokenFromCookie();
  const user = await firstValueFrom(store.select(getUser));
  const isUserGuestValue = await firstValueFrom(store.select(isUserGuest));
  if (!token) {
    router.navigateByUrl('login');
    return false;
  }
  if (isUserGuestValue || token === USER_GUEST_COOKIE) {
    store.dispatch(getUserGuest());
    return true;
  }
  if (!user) {
    store.dispatch(getUserRemote({ token }));
  }
  return true;
};
