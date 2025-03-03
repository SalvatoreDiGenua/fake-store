import { createSelector } from '@ngrx/store';
import { Product } from '../../../models/product';
import { FakeStoreReducers } from '../app.reducers';
import { ItemCart } from '../../../models/itemCart';

export const getCart = (store: FakeStoreReducers): Product[] => store.cart;

export const getCartCount = createSelector(
  getCart,
  (cartList) => cartList.length,
);

export const getCartTotalToSpend = createSelector(getCart, (cartList) =>
  cartList.reduce((acc, el) => (acc += el.price), 0),
);

export const getCartGrouped = createSelector(getCart, (cartList) => {
  const itemsCart: ItemCart[] = [];
  const mapItemsCount = new Map<number, number>();
  cartList.forEach((el) => {
    const elCount = mapItemsCount.get(el.id) || 0;
    mapItemsCount.set(el.id, elCount + 1);
  });
  [...mapItemsCount.entries()].forEach(([idProduct, count]) => {
    const product = cartList.find((el) => el.id === idProduct);
    itemsCart.push({ ...product, count });
  });
  return itemsCart;
});

export const getSingleItemCart = (idItemCart: number) =>
  createSelector(getCartGrouped, (cartList) =>
    cartList.find((el) => el.id === idItemCart),
  );
