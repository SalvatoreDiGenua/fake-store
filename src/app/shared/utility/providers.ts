import { Provider } from '@angular/core';
import { Store } from '@ngrx/store';
import { FakeStoreReducers } from '../stores/app.reducers';
import { APP_STORE } from './injection-tokens';

export const provideAppStore = (): Provider => ({
  provide: APP_STORE,
  useFactory: (store: Store<FakeStoreReducers>) => store,
  deps: [Store<FakeStoreReducers>],
});
