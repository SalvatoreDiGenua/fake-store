import { Product } from "../../../models/product";
import { FakeStoreReducers } from "../app.reducers";

export const getCart = (store: FakeStoreReducers): Product[] => store.cart;
