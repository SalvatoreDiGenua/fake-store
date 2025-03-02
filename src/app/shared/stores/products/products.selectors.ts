import { Product } from '../../../models/product';
import { FakeStoreReducers } from '../app.reducers';

export const getProducts = (state: FakeStoreReducers): Product[] =>
  state.products;

export const getProductCategories = (state: FakeStoreReducers): string[] => [
  ...(state.products || []).reduce(
    (acc, el) => acc.add(el.category),
    new Set<string>(),
  ),
];
