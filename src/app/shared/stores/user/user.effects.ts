import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, of, switchMap } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { getUserRemote, updateUser } from './user.actions';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class UserEffects {
  #actions: Actions = inject(Actions);
  #userService: UserService = inject(UserService);

  userEffects$ = createEffect(() =>
    this.#actions.pipe(
      ofType(getUserRemote),
      switchMap((data) => {
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
