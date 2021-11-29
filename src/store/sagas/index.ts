import { all, fork } from 'redux-saga/effects';

import auth from './auth';

const rootSaga = function* root() {
  yield all([fork(auth)]);
};

export * from './auth';
export default rootSaga;
