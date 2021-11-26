import { FunctionComponent } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import createStore from '@store';
import GlobalStyle from '@styles';

import { ConsolePage, LoginPage } from '../Pages';

const { store, persistor } = createStore();

const App: FunctionComponent = () => (
  <BrowserRouter>
    <Provider store={store}>
      <GlobalStyle />
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/" element={<ConsolePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

export default App;
