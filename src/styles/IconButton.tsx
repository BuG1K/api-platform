import styled from 'styled-components';

const IconButton = styled.button`
  border: 1px solid rgba(0, 0, 0, 0);
  padding: 6px 4px;
  display: flex;
  align-items: center;
  background: none;

  :hover, :focus {
    color: #0055FB;

    svg path {
      stroke: #0055FB;
    }
  }

  :focus {
    border: 1px solid #45A5FF;
    border-radius: 7px;
  }
`;

export default IconButton;
