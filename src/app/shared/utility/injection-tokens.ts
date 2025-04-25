import { InjectionToken } from '@angular/core';
import { FakeStoreReducers } from '../stores/app.reducers';
import { Store } from '@ngrx/store';

export const APP_STORE = new InjectionToken<Store<FakeStoreReducers>>(
  'APP_STORE',
);
