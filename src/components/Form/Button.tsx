import { ButtonHTMLAttributes, FunctionComponent } from 'react';

import loaderImage from '@images/loader.svg';
import ButtonStyled from './ButtonStyled';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: true
  children: string
}

const Button: FunctionComponent<Props> = ({
  type, disabled, loading, children,
}) => (
  <ButtonStyled
    type={type}
    disabled={disabled || loading}
    loading={loading}
  >
    {loading ? <img src={loaderImage} alt="loading" /> : children}
  </ButtonStyled>
);

export default Button;
