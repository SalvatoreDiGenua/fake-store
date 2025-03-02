import { createAction, props } from '@ngrx/store';
import { Product } from '../../../models/product';

export const getAllProductsRemote = createAction(
  '[Products] Get all products from remote',
);
export const updateAllProducts = createAction(
  '[Products] Update all products',
  props<{ products: Product[] }>(),
);
