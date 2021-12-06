import { InputHTMLAttributes, FunctionComponent } from 'react';

import InputStyled from './InputStyled';

interface Props {
  title: string
  description?: string
  error?: boolean
  inputProps: InputHTMLAttributes<HTMLInputElement>
}

const Input: FunctionComponent<Props> = ({
  title, description, error = false, inputProps,
}) => (
  <div>
    <InputStyled.Header>
      <InputStyled.Title error={+error}>{title}</InputStyled.Title>
      {description && (
        <InputStyled.Description>{description}</InputStyled.Description>
      )}
    </InputStyled.Header>
    <InputStyled.Input error={+error} {...inputProps} />
  </div>
);

export default Input;
