import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    color: ${(props) => props.theme.text};
    box-sizing: border-box;
    font: 400 16px Roboto, sans-serif;
    background-color: ${(props) => props.theme.primary};
  }

  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      color: inherit;
    }
  }
`;

export const Theme = {
  primary: "#16213E",
  secondary: "#0F3460",
  accent: "#E94560",
  text: "#fff",
};