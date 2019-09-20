import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    background-color: ${({ theme }) => theme.darkGray};
    font-family: Arial, Helvetica, sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  @media screen and (max-width: 425px) {
    body {
      padding: 0;
    }
  }
`;

export default GlobalStyles;