import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, of, switchMap } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { getUserRemote, updateUser } from './user.actions';
import { jwtDecode } from 'jwt-decode';
import { setTokenIntoCookie } from '../../utility/fake-store-functions';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class UserEffects {
  #actions: Actions = inject(Actions);
  #userService: UserService = inject(UserService);
  #cookieService: CookieService = inject(CookieService);

  userEffects$ = createEffect(() =>
    this.#actions.pipe(
      ofType(getUserRemote),
      switchMap((data) => {
        setTokenIntoCookie(this.#cookieService, data.token);
        const tokenDecoded = jwtDecode(data.token);
        if (!tokenDecoded) {
          return of(null);
        }
        return this.#userService.getUser(tokenDecoded.sub);
      }),
      map((user) => updateUser({ user })),
    ),
  );
}
