import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, of, switchMap } from 'rxjs';
import { UserService } from '../../../services/user.service';
import {
  getUserGuest,
  getUserRemote,
  setUserGuest,
  updateUser,
} from './user.actions';
import { CookieService } from 'ngx-cookie-service';
import { setTokenIntoCookie } from '../../utility/cookie';
import { LOGIN_GUEST, USER_GUEST_COOKIE } from '../../../models/user';

@Injectable()
export class UserEffects {
  #actions: Actions = inject(Actions);
  #userService: UserService = inject(UserService);
  #cookieService: CookieService = inject(CookieService);

  getUserRemoteEffects$ = createEffect(() =>
    this.#actions.pipe(
      ofType(getUserRemote),
      switchMap((data) => {
        setTokenIntoCookie(this.#cookieService, data.token);
        return this.#userService.getUserByToken(data.token);
      }),
      map((user) => updateUser({ user })),
    ),
  );

  getUserGuestEffects$ = createEffect(() =>
    this.#actions.pipe(
      ofType(getUserGuest),
      switchMap(() => {
        setTokenIntoCookie(this.#cookieService, USER_GUEST_COOKIE);
        return of({ userGuest: LOGIN_GUEST });
      }),
      map((userGuest) => setUserGuest(userGuest)),
    ),
  );
}
