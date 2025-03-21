import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  #KEY_IDPRODUCT_LOCALSTORAGE = 'KEY_IDPRODUCT_TO_SCROLL';
  #KEY_QUERY_SEARCH_PRODUCT_LOCALSTORAGE = 'KEY_QUERY_SEARCH_PRODUCT';

  getIdProductFromLocalStorage(): string {
    return localStorage.getItem(this.#KEY_IDPRODUCT_LOCALSTORAGE);
  }

  setIdProductIntoLocalStorage(idProduct: string) {
    localStorage.setItem(this.#KEY_IDPRODUCT_LOCALSTORAGE, idProduct);
  }

  removeIdProductFromLocalStorage() {
    localStorage.removeItem(this.#KEY_IDPRODUCT_LOCALSTORAGE);
  }

  getQueriesFromLocalStorage(): string[] {
    let queries: string[] = [];
    const queriesLocalStorage = localStorage.getItem(
      this.#KEY_QUERY_SEARCH_PRODUCT_LOCALSTORAGE,
    );
    if (queriesLocalStorage) {
      queries = JSON.parse(queriesLocalStorage);
    }
    return queries;
  }

  setQueriesIntoLocalStorage(queries: string[]) {
    localStorage.setItem(
      this.#KEY_QUERY_SEARCH_PRODUCT_LOCALSTORAGE,
      JSON.stringify(queries),
    );
  }

  removeQueriesFromLocalStorage() {
    localStorage.removeItem(this.#KEY_QUERY_SEARCH_PRODUCT_LOCALSTORAGE);
  }
}
