import { Provider } from '@angular/core';
import { Store } from '@ngrx/store';
import { FakeStoreReducers } from '../stores/app.reducers';
import { APP_STORE } from './injection-tokens';

export const provideFakeAppStore_Store = (): Provider => ({
  provide: APP_STORE,
  useFactory: (store: Store<FakeStoreReducers>) => store,
  deps: [Store<FakeStoreReducers>],
});
