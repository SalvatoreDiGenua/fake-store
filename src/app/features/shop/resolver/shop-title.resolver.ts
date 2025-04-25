import { inject } from '@angular/core';
import { getSingleProduct } from '../../../shared/stores/products/products.selectors';
import { ActivatedRouteSnapshot, MaybeAsync } from '@angular/router';
import { titleResolver } from '../../../shared/resolver/title.resolver';
import { map } from 'rxjs';
import { APP_STORE } from '../../../shared/utility/injection-tokens';

export const shopTitleResolver = (
  route: ActivatedRouteSnapshot,
): MaybeAsync<string> => {
  const idProduct = +route.paramMap.get('idProduct');
  const store = inject(APP_STORE);
  return store
    .select(getSingleProduct(idProduct))
    .pipe(
      map(
        (currentProduct) =>
          titleResolver(currentProduct?.title)(null, null) as string,
      ),
    );
};
