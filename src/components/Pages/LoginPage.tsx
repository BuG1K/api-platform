import { FunctionComponent } from 'react';
import { Formik } from 'formik';

import logoImage from '@images/logo.svg';
import mehImage from '@images/meh.svg';
import LoginPageStyled from './LoginPageStyled';
import { Input, Button } from '../Form';

interface InitialValuesForm {
  login: string
  additionalLogin: string
  password: string
}

const LoginPage: FunctionComponent = () => {
  const initialValues = {
    login: '',
    additionalLogin: '',
    password: '',
  };
  const er = false;

  return (
    <LoginPageStyled.Container>
      <img src={logoImage} alt="logo" />

      <Formik<InitialValuesForm>
        initialValues={initialValues}
        validate={(values: InitialValuesForm) => {
          const errors: { [name: string]: string } = {};

          Object.keys(values).forEach((name) => {
            if (!values[name as keyof typeof initialValues]) {
              errors[name] = 'Required';
            }
          });

          return errors;
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, errors, handleChange, handleSubmit, touched }) => (
          <form onSubmit={handleSubmit}>
            <LoginPageStyled.Form>

              <LoginPageStyled.Title>API-консолька</LoginPageStyled.Title>

              {er && (
              <LoginPageStyled.Alert>
                <LoginPageStyled.Smile
                  src={mehImage}
                  alt="authorisation error"
                />
                <div>
                  <LoginPageStyled.ErrorTitle>
                    Вход не вышел
                  </LoginPageStyled.ErrorTitle>
                  <LoginPageStyled.ErrorDescription>
                    {'{id: "error/auth/failed", explain: "wrong_credentials"}'}
                  </LoginPageStyled.ErrorDescription>
                </div>
              </LoginPageStyled.Alert>
              )}

              <Input
                title="Логин"
                inputProps={{
                  name: 'login',
                  value: values.login,
                  onChange: handleChange,
                }}
              />

              <Input
                title="Сублогин"
                description="Опционально"
                inputProps={{
                  name: 'additionalLogin',
                  value: values.additionalLogin,
                  onChange: handleChange,
                }}
              />

              <Input
                title="Пароль"
                inputProps={{
                  type: 'password',
                  name: 'password',
                  value: values.password,
                  onChange: handleChange,
                }}
              />

              <Button type="submit">Войти</Button>
            </LoginPageStyled.Form>
          </form>
        )}
      </Formik>

      <LoginPageStyled.Link href="http://$">
        @link-to-your-github
      </LoginPageStyled.Link>
    </LoginPageStyled.Container>
  );
};

export default LoginPage;
