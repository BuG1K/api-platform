import styled from 'styled-components';

interface Props {
  error?: number
}

const InputStyled = {
  Container: styled.div``,
  Header: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  Title: styled.span<Props>`
    font-size: 16px;
    color: ${({ error }) => (error ? '#CF2C00' : 'gray')};
  `,
  Description: styled.span`
    font-size: 12px;
    color: #999999;
  `,
  Input: styled.input<Props>`
    margin-top: 5px;
    box-sizing: border-box;
    border: 1px solid ${({ error }) => (error ? '#CF2C00' : 'rgba(0, 0, 0, 0.2)')};
    border-radius: 5px;
    width: 100%;
    height: 40px;
    padding: 5px 10px;
    font-size: 18px;

    &[type="password"] {
      font-family: Verdana, sans-serif;
      font-size: 30px;
    }

    :hover {
      border: 1px solid rgba(0, 0, 0, 0.4);
    }

    :focus {
      outline: none;
      box-shadow: 0 0 0 1.5px ${({ error }) => (error ? 'rgba(207, 44, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)')};
    }
  `,
};

export default InputStyled;
