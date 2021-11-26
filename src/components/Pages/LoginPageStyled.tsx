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
  Form: styled.div`
    width: 520px;
    background: #FFFFFF;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 40px 30px;
    box-sizing: border-box;
    margin-top: 20px;

    > * {
      margin-top: 20px;
    }
  `,
  Title: styled.h1`
    font-size: 24px;
  `,
  Alert: styled.div`
    background-color: rgba(207, 44, 0, 0.1);
    border-radius: 5px;
    display: flex;
    align-items: flex-start;
    padding: 15px 12px 10px 12px;
    color: #CF2C00;
  `,
  Smile: styled.img`
    margin-right: 8px;
    transform: translateY(5px);
  `,
  ErrorTitle: styled.h2`
    font-weight: 400;
  `,
  ErrorDescription: styled.p`
    font-size: 12px;
    opacity: 0.5;
  `,
  Link: styled.a`
    margin-top: 20px;
  `,
};

export default LoginPageStyled;
