import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, of, switchMap } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { getUserRemote, updateUser } from './user.actions';
import { CookieService } from 'ngx-cookie-service';
import { setTokenIntoCookie } from '../../utility/cookie';

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
        return this.#userService.getUserByToken(data.token);
      }),
      map((user) => updateUser({ user })),
    ),
  );
}
