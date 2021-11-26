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
    font-family: 'SFPro', sans-serif;
    background-color: #E5E5E5;
  }

  a {
    color: #999999;
    text-decoration: none;

    :hover {
      color: #8b8686;
    }
  }
`;

export default GlobalStyle;
