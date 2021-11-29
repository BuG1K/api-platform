import { FunctionComponent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';

import {
  useSelector, selectIsAuth, useDispatch,
  selectAuthError, selectAuthLoading,
  actionLogout, actionAuthenticate,
} from '@store';
import logoImage from '@images/logo.svg';
import mehImage from '@images/meh.svg';
import LoginPageStyled from './LoginPageStyled';
import formConstants from './formConstants';
import { Input, Button } from '../Form';

interface InitialValuesForm {
  login: string
  sublogin: string
  password: string
}

const LoginPage: FunctionComponent = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector(selectAuthError);
  const loading = useSelector(selectAuthLoading);
  const initialValues: InitialValuesForm = {
    login: '',
    sublogin: '',
    password: '',
  };

  useEffect(() => {
    if (isAuth) dispatch(actionLogout());
  }, []);

  useEffect(() => {
    if (isAuth) history.push('/');
  }, [isAuth]);

  const validate = (values: InitialValuesForm) => {
    const errors: { [name: string]: string } = {};

    Object.keys(values).forEach((name) => {
      if (!values[name as keyof typeof initialValues]) {
        errors[name] = 'Required';
      }
    });

    return errors;
  };

  const onSubmit = (values: InitialValuesForm) => {
    dispatch(actionAuthenticate(values));
  };

  return (
    <LoginPageStyled.Container>
      <img src={logoImage} alt="logo" />

      <Formik<InitialValuesForm>
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({
          handleSubmit, errors, touched, values, handleChange,
        }) => (
          <form onSubmit={handleSubmit}>
            <LoginPageStyled.Form>

              <LoginPageStyled.Title>API-консолька</LoginPageStyled.Title>

              {error && (
              <LoginPageStyled.Alert>
                <LoginPageStyled.Smile
                  src={mehImage}
                  alt="authorisation error"
                />
                <div>
                  <LoginPageStyled.ErrorTitle>
                    {formConstants.error_login}
                  </LoginPageStyled.ErrorTitle>
                  <LoginPageStyled.ErrorDescription>
                    {error}
                  </LoginPageStyled.ErrorDescription>
                </div>
              </LoginPageStyled.Alert>
              )}

              <Input
                title={formConstants.input_title_login}
                error={Boolean(errors.login && touched.login)}
                inputProps={{
                  name: 'login',
                  value: values.login,
                  onChange: handleChange,
                }}
              />

              <Input
                title={formConstants.input_title_sublogin}
                description={formConstants.input_description_sublogin}
                error={Boolean(errors.sublogin && touched.sublogin)}
                inputProps={{
                  name: 'sublogin',
                  value: values.sublogin,
                  onChange: handleChange,
                }}
              />

              <Input
                title={formConstants.input_title_password}
                error={Boolean(errors.password && touched.password)}
                inputProps={{
                  type: 'password',
                  name: 'password',
                  value: values.password,
                  onChange: handleChange,
                }}
              />

              <Button loading={loading} type="submit">
                {formConstants.login}
              </Button>
            </LoginPageStyled.Form>
          </form>
        )}
      </Formik>

      <LoginPageStyled.Link href={formConstants.github_link}>
        {formConstants.github_text}
      </LoginPageStyled.Link>
    </LoginPageStyled.Container>
  );
};

export default LoginPage;
