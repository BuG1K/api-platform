import { all, fork } from 'redux-saga/effects';

const rootSaga = function* root() {
  yield all([fork(() => 23)]);
};

export default rootSaga;
