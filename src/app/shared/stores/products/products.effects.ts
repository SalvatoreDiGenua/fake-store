import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { getAllProductsRemote, updateAllProducts } from './products.actions';
import { ProductsService } from '../../../services/products.service';

@Injectable()
export class ProductsEffects {
  #actions: Actions = inject(Actions);
  #productsService: ProductsService = inject(ProductsService);

  productsEffects$ = createEffect(() =>
    this.#actions.pipe(
      ofType(getAllProductsRemote),
      switchMap(() => this.#productsService.getAllProductsRx()),
      map((products) => updateAllProducts({ products })),
    ),
  );
}
