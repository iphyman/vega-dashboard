import { createGlobalStyle } from "styled-components/macro";

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*, :after, :before {
    box-sizing: border-box;
}

html {
  color: #fff;
  background-color: #000;
  font-family: "Inter", "system-ui";
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
}

`;
