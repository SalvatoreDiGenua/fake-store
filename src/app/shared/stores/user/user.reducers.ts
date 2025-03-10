import { createReducer, on } from '@ngrx/store';
import { LOGIN_GUEST, User } from '../../../models/user';
import { removeUser, setUserGuest, updateUser } from './user.actions';

export const userReducers = createReducer<User>(
  null,
  on(updateUser, (currentUserState, action) => action.user),
  on(removeUser, () => null as User),
  on(setUserGuest, () => LOGIN_GUEST),
);
