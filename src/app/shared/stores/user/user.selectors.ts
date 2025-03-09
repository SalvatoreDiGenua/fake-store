import { isNullOrUndefined } from '../../utility/functions';
import { FakeStoreReducers } from '../app.reducers';

export const getUser = (state: FakeStoreReducers) => state.user;
export const isUserLogged = (state: FakeStoreReducers) => !isNullOrUndefined(state.user); 
