import { createReducer, on } from "@ngrx/store";
import { Product } from "../../../models/product";
import { addProductToCart, removeProductToCart } from "./cart.actions";

export const cartReducers = createReducer<Product[]>(
  [],
  on(addProductToCart, (currentCartState, action) => [...currentCartState, action.product]),
  on(removeProductToCart, (currentCartState, action) => currentCartState.slice().filter(product => product.id !== action.product.id)),
);