import styled from 'styled-components';

const LoginPageStyled = {
  Container: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Form: styled.form`
    margin-top: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 5px;
    width: 520px;
    padding: 40px 30px;
    background: #FFFFFF;

    > * {
      margin-top: 20px;
    }
  `,
  Title: styled.h1`
    font-size: 24px;
  `,
  Alert: styled.div`
    border-radius: 5px;
    padding: 15px 12px 10px 12px;
    display: flex;
    align-items: flex-start;
    background-color: rgba(207, 44, 0, 0.1);
    color: #CF2C00;
  `,
  Smile: styled.div`
    margin-right: 8px;
    transform: translateY(5px);
  `,
  ErrorTitle: styled.h2`
    font-weight: 400;
  `,
  ErrorDescription: styled.p`
    opacity: 0.5;
    font-size: 12px;
  `,
  Link: styled.a`
    margin-top: 20px;
  `,
};

export default LoginPageStyled;
