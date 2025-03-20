import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FakeStoreReducers } from '../../../shared/stores/app.reducers';
import { getSingleProduct } from '../../../shared/stores/products/products.selectors';
import { ActivatedRouteSnapshot, MaybeAsync } from '@angular/router';
import { titleResolver } from '../../../shared/resolver/title.resolver';
import { map } from 'rxjs';

export const shopTitleResolver = (
  route: ActivatedRouteSnapshot,
): MaybeAsync<string> => {
  const idProduct = +route.paramMap.get('idProduct');
  const store: Store<FakeStoreReducers> = inject(Store<FakeStoreReducers>);
  return store
    .select(getSingleProduct(idProduct))
    .pipe(
      map(
        (currentProduct) =>
          titleResolver(currentProduct?.title)(null, null) as string,
      ),
    );
};
