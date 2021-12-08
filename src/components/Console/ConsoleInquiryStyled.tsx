import styled from 'styled-components';

const ConsoleInquiryStyled = {
  Container: styled.div`
    padding: 10px 15px 15px 15px;
    display: grid;
    background-color: #FFFFFF;
  `,
  Side: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Title: styled.h2<{ error?: number }>`
    font-size: 12px;
    font-weight: 400;
    color: ${({ error }) => (error ? 'red' : 'initial')};
  `,
  Textarea: styled.textarea<{ error?: number, hooked?: number }>`
    pointer-events: ${({ hooked }) => (hooked ? 'none' : 'auto')};
    resize: none;
    flex: 1;
    margin-top: 3px;
    border-color: ${({ error }) => (error ? 'red' : 'initial')};
    width: 100%;
  `,
  Rope: styled.div`
    cursor: col-resize;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      pointer-events: none;
    }
  `,
};

export default ConsoleInquiryStyled;
