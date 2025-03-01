import { Product } from "../../../models/product";
import { FakeStoreReducers } from "../app.reducers";

export const getCart = (store: FakeStoreReducers): Product[] => store.cart;
export const getCartCount = (store: FakeStoreReducers): number => (store?.cart || []).length;
