import { createSelector } from '@ngrx/store';
import { Product } from '../../../models/product';
import { FakeStoreReducers } from '../app.reducers';
import { PLACEHOLDER_PRODUCT } from '../../placeholder/placeholder-product';

export const getProducts = (state: FakeStoreReducers): Product[] =>
  state.products || [];

export const getProductCategories = createSelector(
  getProducts,
  (products): string[] => [
    ...products.reduce((acc, el) => acc.add(el.category), new Set<string>()),
  ],
);

export const getProductsByQuery = (query: string) =>
  createSelector(getProducts, (products): Product[] =>
    products.filter((product) =>
      query ? product.title.toLowerCase().includes(query.toLowerCase()) : false,
    ),
  );

export const getProductsByCategory = (category: string) =>
  createSelector(getProducts, (products): Product[] =>
    products.filter((el) => (category ? el.category === category : true)),
  );

export const getSingleProduct = (idProduct: number) =>
  createSelector(
    getProducts,
    (products): Product =>
      products.find((el) => el.id === idProduct) || PLACEHOLDER_PRODUCT,
  );
