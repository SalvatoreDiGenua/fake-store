import { createSelector } from '@ngrx/store';
import { Product } from '../../../models/product';
import { FakeStoreReducers } from '../app.reducers';

export const getProducts = (state: FakeStoreReducers): Product[] =>
  state.products || [];

export const getProductCategories = createSelector(getProducts, (products) => [
  ...products
    .slice()
    .reduce((acc, el) => acc.add(el.category), new Set<string>()),
]);

export const getProductsByCategory = (category: string) =>
  createSelector(getProducts, (products) =>
    products
      .slice()
      .filter((el) => (category ? el.category === category : true)),
  );
