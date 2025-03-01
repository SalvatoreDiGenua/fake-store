import { createReducer, on } from "@ngrx/store";
import { updateAllProducts } from "./products.actions";
import { Product } from "../../../models/product";

export const productsReducers = createReducer<Product[]>(
  null,
  on(updateAllProducts, (currentProductsState, action) => action.products),
);