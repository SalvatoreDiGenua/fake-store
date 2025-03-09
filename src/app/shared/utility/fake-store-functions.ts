import { CookieService } from 'ngx-cookie-service';

const KEY_IDPRODUCT_LOCALSTORAGE = 'KEY_IDPRODUCT_TO_SCROLL';
const KEY_FAKESTORE_COOKIE = 'FAKE_STORE';


export const getIdProductFromLocalStorage = () =>
  localStorage.getItem(KEY_IDPRODUCT_LOCALSTORAGE);

export const setIdProductIntoLocalStorage = (idProduct: string) =>
  localStorage.setItem(KEY_IDPRODUCT_LOCALSTORAGE, idProduct);

export const removeIdProductFromLocalStorage = () =>
  localStorage.removeItem(KEY_IDPRODUCT_LOCALSTORAGE);

export const getTokenFromCookie = (cookieService: CookieService) => cookieService.get(KEY_FAKESTORE_COOKIE);

export const setTokenIntoCookie = (cookieService: CookieService, token: string) =>
  cookieService.set(KEY_FAKESTORE_COOKIE, token);

export const removeTokenFromCookie = (cookieService: CookieService) =>
  cookieService.delete(KEY_FAKESTORE_COOKIE);
