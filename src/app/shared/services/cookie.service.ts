import { inject, Injectable } from '@angular/core';
import { CookieService as NgxCookieServices } from 'ngx-cookie-service';
import dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  #KEY_FAKESTORE_COOKIE = 'FAKE_STORE';
  #ngxCookieService: NgxCookieServices = inject(NgxCookieServices);

  getTokenFromCookie(): string {
    return this.#ngxCookieService.get(this.#KEY_FAKESTORE_COOKIE);
  }

  setTokenIntoCookie(token: string) {
    const expires = dayjs(new Date()).add(1, 'hour').toDate();
    this.#ngxCookieService.set(this.#KEY_FAKESTORE_COOKIE, token, expires, '/');
  }

  removeTokenFromCookie() {
    this.#ngxCookieService.delete(this.#KEY_FAKESTORE_COOKIE);
  }
}
