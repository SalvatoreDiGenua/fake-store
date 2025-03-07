import { createReducer, on } from '@ngrx/store';
import { Product } from '../../../models/product';
import {
  addProductToCart,
  resetCart,
  removeAllProductFromCart,
  removeSingleProductFromCart,
} from './cart.actions';
import { ItemCart } from '../../../models/itemCart';

export const cartReducers = createReducer<Product[]>(
  [],
  on(addProductToCart, (currentCartState, action) => [
    ...currentCartState,
    action.product,
  ]),
  on(removeAllProductFromCart, (currentCartState, action) =>
    currentCartState
      .slice()
      .filter((product) => product.id !== action.product.id),
  ),
  on(removeSingleProductFromCart, (currentCartState, action) => {
    const newCartState = currentCartState.slice();
    const indexProductToRemove = newCartState.findIndex(
      (product) => product.id === action.product.id,
    );
    if (indexProductToRemove === -1) {
      return newCartState;
    }
    newCartState.splice(indexProductToRemove, 1);
    return newCartState;
  }),
  on(resetCart, () => [] as ItemCart[]),
);
