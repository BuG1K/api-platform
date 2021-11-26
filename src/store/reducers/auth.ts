import { handleActions } from 'redux-actions';

import authActionTypes from '../constants';

export const initialState = {
  loading: false,
  sessionKey: null,
  login: null,
  sublogin: null,
};

export default {
  auth: handleActions(
    {
      [authActionTypes.AUTHENTICATE]: (state) => ({
        ...state,
        loading: true,
      }),
      [authActionTypes.AUTHENTICATE_SUCCESS]: (state, { payload }) => ({
        ...state,
        loading: false,
        sessionKey: payload.sessionKey,
        login: payload.login,
        sublogin: payload.sublogin,
      }),
      [authActionTypes.AUTHENTICATE_FAILURE]: (state) => ({
        ...state,
        sessionKey: null,
        login: null,
        sublogin: null,
      }),
      [authActionTypes.LOGOUT]: (state) => ({
        ...state,
        loading: false,
        sessionKey: null,
      }),
    },
    initialState,
  ),
};
