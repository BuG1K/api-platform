import { StateType } from './reducers';

export const selectIsAuth = (state: StateType) => state.auth.sessionKey;
export const selectAuthError = (state: StateType) => state.auth.error;
export const selectAuthLoading = (state: StateType) => state.auth.loading;
