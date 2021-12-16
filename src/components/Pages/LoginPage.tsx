import { memo, FunctionComponent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

import {
  useSelector, selectIsAuth, useDispatch,
  selectAuthError, selectAuthLoading,
  actionLogout, actionAuthenticate,
} from '@store';
import logoImage from '@images/logo.svg';
import LoginPageStyled from './LoginPageStyled';
import { EmojiIcon } from '../Icons';
import formConstants from './formConstants';
import { Input, Button } from '../Form';

interface ValuesForm {
  login: string
  sublogin: string
  password: string
}

const MemoizedButton = memo(Button);
const MemoizedInput = memo(Input, (prevProps, nextProps) =>
  prevProps.inputProps.value === nextProps.inputProps.value
  && prevProps.error === nextProps.error);

const LoginPage: FunctionComponent = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector(selectAuthError);
  const loading = useSelector(selectAuthLoading);
  const {
    handleSubmit, errors, values, touched, handleChange,
  } = useFormik<ValuesForm>({
    initialValues: {
      login: '',
      sublogin: '',
      password: '',
    },
    validate: (formValue) => {
      const resultErrors: { [name: string]: string } = {};

      Object.keys(formValue).forEach((name) => {
        if (!formValue[name as keyof ValuesForm]) {
          resultErrors[name] = 'Required';
        }
      });

      return resultErrors;
    },
    onSubmit: (formValue) => {
      dispatch(actionAuthenticate(formValue));
    },
  });

  useEffect(() => {
    if (isAuth) history.push('/');
  }, [isAuth]);

  return (
    <LoginPageStyled.Container>
      <img src={logoImage} alt="logo" />

      <LoginPageStyled.Form onSubmit={handleSubmit}>
        <LoginPageStyled.Title>{formConstants.title}</LoginPageStyled.Title>

        {error && (
          <LoginPageStyled.Alert>
            <LoginPageStyled.Smile>
              <EmojiIcon />
            </LoginPageStyled.Smile>
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

        <MemoizedInput
          title={formConstants.input_title_login}
          error={Boolean(errors.login && touched.login)}
          inputProps={{
            name: 'login',
            value: values.login,
            onChange: handleChange,
          }}
        />

        <MemoizedInput
          title={formConstants.input_title_sublogin}
          description={formConstants.input_description_sublogin}
          error={Boolean(errors.sublogin && touched.sublogin)}
          inputProps={{
            name: 'sublogin',
            value: values.sublogin,
            onChange: handleChange,
          }}
        />

        <MemoizedInput
          title={formConstants.input_title_password}
          error={Boolean(errors.password && touched.password)}
          inputProps={{
            type: 'password',
            name: 'password',
            value: values.password,
            onChange: handleChange,
          }}
        />

        <MemoizedButton loading={loading} type="submit">
          {formConstants.login}
        </MemoizedButton>
      </LoginPageStyled.Form>

      <LoginPageStyled.Link href={formConstants.github_link}>
        {formConstants.github_text}
      </LoginPageStyled.Link>
    </LoginPageStyled.Container>
  );
};

export default LoginPage;
