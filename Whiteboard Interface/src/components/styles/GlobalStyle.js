import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin-top: 8vh;
    font-size: 10px;
    font-family: 'Inter', sans-serif;
  }
`;

export default GlobalStyle;