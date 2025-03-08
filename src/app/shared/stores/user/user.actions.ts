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
