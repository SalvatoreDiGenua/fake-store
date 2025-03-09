import { CookieService } from 'ngx-cookie-service';

const KEY_FAKESTORE_COOKIE = 'FAKE_STORE';

export const getTokenFromCookie = (cookieService: CookieService) =>
  cookieService.get(KEY_FAKESTORE_COOKIE);

export const setTokenIntoCookie = (
  cookieService: CookieService,
  token: string,
) => cookieService.set(KEY_FAKESTORE_COOKIE, token);

export const removeTokenFromCookie = (cookieService: CookieService) =>
  cookieService.delete(KEY_FAKESTORE_COOKIE);
