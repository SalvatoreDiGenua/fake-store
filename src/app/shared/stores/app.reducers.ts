import { ActionReducerMap } from "@ngrx/store";
import { productsReducer } from "./products/products.reducers";
import { Product } from "../../models/product";
import { Signal } from "@angular/core";

export interface FakeStoreReducers {
  products: Product[],
}

export const fakeStoreReducers: ActionReducerMap<FakeStoreReducers> = {
  products: productsReducer,
}