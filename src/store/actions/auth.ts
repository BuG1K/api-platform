import { createAction } from 'redux-actions';

import ActionTypes from '../constants';

export const actionAuthenticate = createAction<{
  login: string
  sublogin: string
  password: string
}>(ActionTypes.AUTHENTICATE);

export const actionAuthenticateSuccess = createAction<{
  sessionKey: string
  login: string
  sublogin: string
}>(ActionTypes.AUTHENTICATE_SUCCESS);

export const actionAuthenticateError = createAction<{
  error: string
}>(ActionTypes.AUTHENTICATE_ERROR);

export const actionLogout = createAction(ActionTypes.LOGOUT);

export const actionAuthenticateFailure = createAction(
  ActionTypes.AUTHENTICATE_FAILURE,
);

export const actionAuthenticateCheck = createAction(
  ActionTypes.AUTHENTICATE_CHECK,
);

export type ActionsAuth =
  ReturnType<typeof actionAuthenticate>
  | ReturnType<typeof actionAuthenticateSuccess>
  | ReturnType<typeof actionAuthenticateError>
  | ReturnType<typeof actionLogout>
  | ReturnType<typeof actionAuthenticateFailure>
  | ReturnType<typeof actionAuthenticateCheck>
