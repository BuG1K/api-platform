import { ButtonHTMLAttributes, FunctionComponent } from 'react';

import ButtonStyled from './ButtonStyled';
import { LoaderIcon } from '../Icons';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  children: string
}

const Button: FunctionComponent<Props> = ({
  type = 'button', disabled, loading = false, children, ...props
}) => (
  <ButtonStyled
    type={type}
    disabled={disabled || loading}
    loading={+loading}
    {...props}
  >
    {loading ? <LoaderIcon /> : children}
  </ButtonStyled>
);

export default Button;
