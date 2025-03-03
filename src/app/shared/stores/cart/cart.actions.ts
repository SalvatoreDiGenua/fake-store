import { createAction, props } from '@ngrx/store';
import { Product } from '../../../models/product';

export const addProductToCart = createAction(
  '[Cart] Add Product To Cart',
  props<{ product: Product }>(),
);

export const removeSingleProductFromCart = createAction(
  '[Cart] Remove Single Product From Cart',
  props<{ product: Product }>(),
);

export const removeAllProductFromCart = createAction(
  '[Cart] Remove All Product From Cart',
  props<{ product: Product }>(),
);

export const emptyCart = createAction(
  '[Cart] Empty Cart',
  props<{ product: Product }>(),
);
