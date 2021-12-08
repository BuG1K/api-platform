import { createGlobalStyle } from 'styled-components';

import SFProFont from './SFPro.woff2';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SFPro';
    src: url(${SFProFont}) format('woff2');
  }

  * {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #E5E5E5;
    font-family: 'SFPro', sans-serif;
  }

  a {
    color: #999999;
    text-decoration: none;

    :hover {
      color: #8b8686;
    }
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
  }
`;

export default GlobalStyle;
