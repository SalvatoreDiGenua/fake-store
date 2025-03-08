import { ActionReducerMap } from '@ngrx/store';
import { productsReducers } from './products/products.reducers';
import { Product } from '../../models/product';
import { cartReducers } from './cart/cart.reducers';
import { User } from '../../models/user';
import { userReducers } from './user/user.reducers';

export interface FakeStoreReducers {
  user: User;
  products: Product[];
  cart: Product[];
}

export const fakeStoreReducers: ActionReducerMap<FakeStoreReducers> = {
  user: userReducers,
  products: productsReducers,
  cart: cartReducers,
};
