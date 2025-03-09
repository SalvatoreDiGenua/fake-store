const KEY_IDPRODUCT_LOCALSTORAGE = 'KEY_IDPRODUCT_TO_SCROLL';

export const getIdProductFromLocalStorage = () =>
  localStorage.getItem(KEY_IDPRODUCT_LOCALSTORAGE);

export const setIdProductIntoLocalStorage = (idProduct: string) =>
  localStorage.setItem(KEY_IDPRODUCT_LOCALSTORAGE, idProduct);

export const removeIdProductFromLocalStorage = () =>
  localStorage.removeItem(KEY_IDPRODUCT_LOCALSTORAGE);