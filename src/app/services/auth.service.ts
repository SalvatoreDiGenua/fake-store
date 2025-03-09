import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { FakeStoreReducers } from '../shared/stores/app.reducers';
import { removeUser } from '../shared/stores/user/user.actions';
import { Router } from '@angular/router';
import { removeTokenFromCookie } from '../shared/utility/cookie';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #AUTH_URL = `${environment.BASE_URL}/auth/login`;
  #httpClient: HttpClient = inject(HttpClient);
  #store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  #cookieService: CookieService = inject(CookieService);
  #router: Router = inject(Router);

  login(username: string, password: string, withLoader = true) {
    if (!username) {
      throw new Error('To login username is required');
    }
    if (!password) {
      throw new Error('To login email is required');
    }

    return this.#httpClient.post<{ token: string }>(
      this.#AUTH_URL,
      {
        username,
        password,
      },
      {
        withCredentials: true,
        params: { withLoader },
      },
    );
  }

  logout() {
    this.#store.dispatch(removeUser());
    removeTokenFromCookie(this.#cookieService);
    this.#router.navigateByUrl('login');
  }
}
