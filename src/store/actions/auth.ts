import { createAction } from 'redux-actions';

import { AuthActionTypes } from '../constants';

export const actionAuthenticate = createAction<{
  login: string
  sublogin: string
  password: string
}>(AuthActionTypes.AUTHENTICATE);

export const actionAuthenticateSuccess = createAction<{
  sessionKey: string
  login: string
  sublogin: string
}>(AuthActionTypes.AUTHENTICATE_SUCCESS);

export const actionAuthenticateError = createAction<{
  error: string
}>(AuthActionTypes.AUTHENTICATE_ERROR);

export const actionLogout = createAction(AuthActionTypes.LOGOUT);

export const actionAuthenticateFailure = createAction(
  AuthActionTypes.AUTHENTICATE_FAILURE,
);

export const actionAuthenticateCheck = createAction(
  AuthActionTypes.AUTHENTICATE_CHECK,
);

export type ActionsAuth =
  ReturnType<typeof actionAuthenticate>
  | ReturnType<typeof actionAuthenticateSuccess>
  | ReturnType<typeof actionAuthenticateError>
  | ReturnType<typeof actionLogout>
  | ReturnType<typeof actionAuthenticateFailure>
  | ReturnType<typeof actionAuthenticateCheck>
