import { ActionReducerMap } from '@ngrx/store';
import { productsReducers } from './products/products.reducers';
import { Product } from '../../models/product';
import { cartReducers } from './cart/cart.reducers';

export interface FakeStoreReducers {
  products: Product[];
  cart: Product[];
}

export const fakeStoreReducers: ActionReducerMap<FakeStoreReducers> = {
  products: productsReducers,
  cart: cartReducers,
};
