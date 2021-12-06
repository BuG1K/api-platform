import { handleActions } from 'redux-actions';

import { AuthActionTypes } from '../constants';

interface State {
  loading: boolean
  error: null| string
  sessionKey: null | string
  login: null | string
  sublogin: null | string
}

const initialState: State = {
  loading: false,
  error: null,
  sessionKey: null,
  login: null,
  sublogin: null,
};

const reduser = handleActions(
  {
    [AuthActionTypes.AUTHENTICATE]: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    [AuthActionTypes.AUTHENTICATE_SUCCESS]: (state, { payload }) => ({
      ...state,
      loading: false,
      sessionKey: payload.sessionKey,
      login: payload.login,
      sublogin: payload.sublogin,
    }),
    [AuthActionTypes.AUTHENTICATE_ERROR]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload.error,
    }),
    [AuthActionTypes.AUTHENTICATE_FAILURE]: (state) => ({
      ...state,
      sessionKey: null,
      login: null,
      sublogin: null,
    }),
    [AuthActionTypes.LOGOUT]: (state) => ({
      ...state,
      loading: false,
      sessionKey: null,
    }),
  },
  initialState,
);

export default reduser;
