import {
  Store,
  applyMiddleware,
  createStore,
  combineReducers as createCombineReducers,
} from 'redux';
import createSagaMiddleware, { Task, SagaMiddleware } from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import rootReducer from './reducers';
import rootSaga from './sagas';

interface SagaTaskStore extends Store {
  runSagaTask?: VoidFunction;
  sagaTask?: Task
}

const bindSagaMiddleware = (sagaMiddleware: SagaMiddleware) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    const { composeWithDevTools } = require('redux-devtools-extension');

    return composeWithDevTools(applyMiddleware(sagaMiddleware));
  }

  return applyMiddleware(sagaMiddleware);
};

const configureStore = (initialState = {} as any) => {
  const sagaMiddleware = createSagaMiddleware();
  const persistConfig = { key: 'root', storage };
  const combineReducers = createCombineReducers({
    auth: persistReducer(persistConfig, rootReducer.auth),
  });
  const store: SagaTaskStore = createStore(
    combineReducers,
    initialState,
    bindSagaMiddleware(sagaMiddleware),
  );
  const persistor = persistStore(store);

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };
  store.runSagaTask();

  return {
    store,
    persistor,
  };
};

export default configureStore;
