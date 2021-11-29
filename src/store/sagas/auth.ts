import {
  put, call, all, takeLatest,
} from 'redux-saga/effects';

import api from '@helpers';
import {
  actionAuthenticate, actionAuthenticateError,
  actionAuthenticateSuccess, actionAuthenticateFailure,
} from '../actions';
import ActionTypes from '../constants';

export function* authenticateSaga(
  { payload }: ReturnType<typeof actionAuthenticate>,
) {
  let error = null;

  yield api.sendsay.login({
    login: payload.login,
    sublogin: payload.sublogin,
    password: payload.password,
  }).then(() => {
    document.cookie = `sendsay_session=${api.sendsay.session}`;
  }).catch(({ id }: any) => {
    error = { id };
    document.cookie = '';
  });

  if (error) {
    yield put(actionAuthenticateError({ error: JSON.stringify(error) }));
  } else {
    yield put(actionAuthenticateSuccess({
      sessionKey: api.sendsay.session,
      login: payload.login,
      sublogin: payload.sublogin,
    }));
  }
}

export function* sagaLogout() {
  document.cookie = '';
  yield put(actionAuthenticateFailure());
}

export function* authenticateCheckSaga() {
  try {
    yield api.sendsay.request({ action: 'pong' });
  } catch (error: any) {
    if (error.id === 'error/auth/failed') yield call(sagaLogout);
  }
}

function* root() {
  yield all([
    takeLatest(ActionTypes.AUTHENTICATE, authenticateSaga),
    takeLatest(ActionTypes.LOGOUT, sagaLogout),
    takeLatest(ActionTypes.AUTHENTICATE_CHECK, authenticateCheckSaga),
  ]);
}

export default root;
