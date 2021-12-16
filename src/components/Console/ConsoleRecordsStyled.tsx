import styled from 'styled-components';

const ConsoleRecordsStyled = {
  Container: styled.div`
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-left: none;
    border-right: none;
    display: flex;
    align-items: center;
    background: #F6F6F6;
  `,
  Items: styled.div`
    position: relative;
    padding: 10px 0 10px 5px;
    width: 100%;
    overflow-x: scroll;
    display: flex;

    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  `,
  Item: styled.div`
    position: relative;
    cursor: pointer;
    margin: 0 10px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    min-width: 80px;
    padding: 5px 10px;
    display: flex;
    width: max-content;
    align-items: center;
    background: #FFFFFF;

    * {
      pointer-events: none;
    }

    :hover {
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    }
  `,
  Actions: styled.div`
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    padding-bottom: 5px;
    width: 135px;
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
  `,
  BoxActions: styled.div`
    margin-bottom: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding: 5px 0; 
    display: flex;
    flex-direction: column;
  `,
  Action: styled.div<{ redHover?: true }>`
    cursor: pointer;
    padding: 10px 15px;

    :hover {
      background-color: ${({ redHover }) => (redHover ? '#CF2C00' : '#0055FB')};
      color: white;
    }
  `,
  Copy: styled.div<{ time: string }>`
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    padding: 0px 5px;
    background: #F6F6F6;
    font-size: 12px;
    animation-name: hide;
    animation-duration: ${({ time }) => time};
    animation-iteration-count: infinite;

    @keyframes hide {
      0% {
        top: 50%;
        opacity: 1;
      }
      100% {
        top: 0%;
        opacity: 0;
      }
    }
  `,
  Сircle: styled.span<{ error?: number }>`
    margin-top: 2px;
    border: 1px solid rgba(0, 0, 0, 0.36);
    border-radius: 50%;
    height: 8px;
    width: 8px;
    background: ${({ error }) => (error ? '#CF2C00' : '#30B800')};
  `,
  Name: styled.span`
    margin-left: 8px;
    margin-right: auto;
    font-size: 14px;
  `,
  ButtonClear: styled.button`
    z-index: 1;
    box-shadow: -15px 0px 10px 0px rgb(246, 246, 246);
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    height: 100%;
    padding: 0 16px;
    background: #F6F6F6;
  `,
};

export default ConsoleRecordsStyled;
