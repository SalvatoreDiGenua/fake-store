import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  #KEY_IDPRODUCT_LOCALSTORAGE = 'KEY_IDPRODUCT_TO_SCROLL';

  getIdProductFromLocalStorage(): string {
    return localStorage.getItem(this.#KEY_IDPRODUCT_LOCALSTORAGE);
  }

  setIdProductIntoLocalStorage(idProduct: string) {
    localStorage.setItem(this.#KEY_IDPRODUCT_LOCALSTORAGE, idProduct);
  }

  removeIdProductFromLocalStorage() {
    localStorage.removeItem(this.#KEY_IDPRODUCT_LOCALSTORAGE);
  }
}
