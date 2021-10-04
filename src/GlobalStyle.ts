import { createGlobalStyle } from "styled-components/macro";
import "inter-ui";

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

html body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
}

.react-grid-item > .react-resizable-handle::after {
  width: 10px;
  height: 10px;
  border-right: 3px solid #f5f5f5a3;
  border-bottom: 3px solid #f5f5f5a3;
  opacity: 0;
  transition: 0.25s opacity ease;
}

.react-grid-item > .react-resizable-handle:hover::after {
    opacity: 1;
  }
`;
