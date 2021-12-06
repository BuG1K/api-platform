import styled from 'styled-components';

interface Props {
  loading?: number
}

const ButtonStyled = styled.button<Props>`
  border-radius: 5px;
  width: 110px;
  height: 40px;
  background: linear-gradient(180deg, #45A6FF 0%, #0055FB 100%), #C4C4C4;
  font-size: 16px;
  color: white;

  :hover {
    background: linear-gradient(
      0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)),
      linear-gradient(180deg, #45A6FF 0%, #0055FB 100%), #C4C4C4;
  }

  :focus {
    box-shadow: 0 0 0 2px rgba(21, 156, 228, 0.4);
  }

  :active {
    background: linear-gradient(
      0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),
      linear-gradient(180deg, #45A6FF 0%, #0055FB 100%), #C4C4C4;
  }

  :disabled {
    background: ${({ loading }) => (loading
    ? 'linear-gradient(180deg, #45A6FF 0%, #0055FB 100%), #C4C4C4'
    : 'linear-gradient(0deg, #C4C4C4, #C4C4C4), linear-gradient(180deg, #45A6FF 0%, #0055FB 100%)')};
  }
`;

export default ButtonStyled;
