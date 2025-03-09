import { createAction, props } from '@ngrx/store';
import { User } from '../../../models/user';

export const getUserRemote = createAction(
  '[USER] Get user remote',
  props<{ token: string }>(),
);

export const updateUser = createAction(
  '[USER] Update user',
  props<{ user: User }>(),
);

export const removeUser = createAction('[USER] Remove user');

export const setUserGuest = createAction('[USER] Login as Guest');
