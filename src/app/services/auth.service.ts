import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { FakeStoreReducers } from '../shared/stores/app.reducers';
import { removeUser } from '../shared/stores/user/user.actions';
import { Router } from '@angular/router';
import { CookieService } from '../shared/services/cookie.service';

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
        withCredentials: false,
        params: { withLoader },
      },
    );
  }

  logout() {
    this.#store.dispatch(removeUser());
    this.#cookieService.removeTokenFromCookie();
    this.#router.navigateByUrl('login');
  }
}
