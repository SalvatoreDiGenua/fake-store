import { createSelector } from '@ngrx/store';
import { FakeStoreReducers } from '../app.reducers';
import { LOGIN_GUEST } from '../../../models/user';

export const getUser = (state: FakeStoreReducers) => state.user;
export const isUserGuest = createSelector(
  getUser,
  (user) => user?.id === LOGIN_GUEST.id,
);
