import styled from "styled-components";
import { NavButtonStyled } from "./buttons";

export const Dropdown = styled.div<{ open: boolean }>`
  background-color: ${({ theme }) => theme.colors.primary};
  position: absolute;

  ${({ open, theme }) =>
    open
      ? `
  max-height: 100vh;
  transition: max-height 1s linear;
  box-shadow: 2px 2px 2px 1px ${theme.colors.text}22;
  `
      : "max-height: 0"};

  overflow-y: hidden;
  z-index: 99;
`;

export const DrawerMenuItemStyled = styled(NavButtonStyled)`
  width: 100%;
  background-color: inherit;
  padding: 15px;
  /* a {
    width: 100%;
    justify-content: start;
    padding: 15px;
  } */
`;
