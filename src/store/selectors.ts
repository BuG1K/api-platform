import { StateType } from './reducers';

export const selectIsAuth = (state: StateType) => state.auth.sessionKey;
export const selectAuthError = (state: StateType) => state.auth.error;
export const selectAuthLoading = (state: StateType) => state.auth.loading;
export const selectUser = (state: StateType) => ({
  login: state.auth.login,
  sublogin: state.auth.sublogin,
});
export const selectRecords = (state: StateType) => state.records;
