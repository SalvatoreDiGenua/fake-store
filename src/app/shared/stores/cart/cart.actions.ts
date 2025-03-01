import { createAction, props } from "@ngrx/store";
import { Product } from "../../../models/product";

export const addProductToCart = createAction('[Cart] Add Product To Cart', props<{ product: Product }>());
export const removeProductFromCart = createAction('[Cart] Remove Product To Cart', props<{ product: Product }>());