import { FunctionComponent, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import {
  useDispatch, useSelector, selectIsAuth, actionAuthenticateCheck,
} from '@store';
import ConsolePage from './ConsolePage';
import LoginPage from './LoginPage';

const Routes: FunctionComponent = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(actionAuthenticateCheck());
  }, []);

  return (
    <>
      <Route exact path="/">
        {isAuth ? <ConsolePage /> : <Redirect to="/login" />}
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
    </>
  );
};

export default Routes;
