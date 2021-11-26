import {
  FunctionComponent,
  InputHTMLAttributes,
} from 'react';

import InputStyled from './InputStyled';

interface Props {
  title: string
  description?: string
  error?: true
  inputProps: InputHTMLAttributes<HTMLInputElement>
}

const Input: FunctionComponent<Props> = ({
  title, description, error, inputProps,
}) => (
  <div>
    <InputStyled.Header>
      <InputStyled.Title error={error}>{title}</InputStyled.Title>
      {description && (
        <InputStyled.Description>{description}</InputStyled.Description>
      )}
    </InputStyled.Header>
    <InputStyled.Input error={error} {...inputProps} />
  </div>
);

export default Input;
