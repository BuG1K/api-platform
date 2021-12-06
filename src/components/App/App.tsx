import { FunctionComponent } from 'react';
import {
  BrowserRouter,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import createStore from '@store';
import GlobalStyle from '@styles';
import Routes from '../Pages';

const { store, persistor } = createStore();

const App: FunctionComponent = () => (
  <BrowserRouter>
    <Provider store={store}>
      <GlobalStyle />
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

export default App;
