import styled from 'styled-components';

const ConsoleHeaderStyled = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background-color: #F6F6F6;
  `,
  Side: styled.div`
    display: flex;
    align-items: center;
  `,
  Title: styled.div`
    margin-left: 20px;
    font-size: 20px;
  `,
  Login: styled.div`
    display: flex;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    padding: 5px 15px;
  `,
  Dividing: styled.div`
    margin: 0 5px;
    color: rgba(0, 0, 0, 0.2);
  `,
};

export default ConsoleHeaderStyled;
