import { Product } from "../../../models/product";
import { FakeStoreReducers } from "../app.reducers";

export const getProducts = (state: FakeStoreReducers): Product[] => state.products;
