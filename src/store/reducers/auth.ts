import { handleActions } from 'redux-actions';

import ActionTypes from '../constants';

interface StateAuthType {
  loading: boolean
  error: null| string
  sessionKey: null | string
  login: null | string
  sublogin: null | string
}

const initialState: StateAuthType = {
  loading: false,
  error: null,
  sessionKey: null,
  login: null,
  sublogin: null,
};

const reduser = handleActions<StateAuthType>(
  {
    [ActionTypes.AUTHENTICATE]: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    [ActionTypes.AUTHENTICATE_SUCCESS]: (state, { payload }) => ({
      ...state,
      loading: false,
      sessionKey: payload.sessionKey,
      login: payload.login,
      sublogin: payload.sublogin,
    }),
    [ActionTypes.AUTHENTICATE_ERROR]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload.error,
    }),
    [ActionTypes.AUTHENTICATE_FAILURE]: (state) => ({
      ...state,
      sessionKey: null,
      login: null,
      sublogin: null,
    }),
    [ActionTypes.LOGOUT]: (state) => ({
      ...state,
      loading: false,
      sessionKey: null,
    }),
  },
  initialState,
);

export default reduser;
