import { createReducer, on } from "@ngrx/store";
import { updateAllProducts } from "./products.actions";
import { Product } from "../../../models/product";

export const productsReducer = createReducer<Product[]>(
  null,
  on(updateAllProducts, (currentProductsState, action) => action.products),
);