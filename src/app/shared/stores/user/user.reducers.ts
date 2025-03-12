import { createReducer, on } from '@ngrx/store';
import { User } from '../../../models/user';
import { removeUser, setUserGuest, updateUser } from './user.actions';

export const userReducers = createReducer<User>(
  null,
  on(updateUser, (currentUserState, action) => action.user),
  on(removeUser, () => null as User),
  on(setUserGuest, (currentUserState, actions) => actions.userGuest),
);
