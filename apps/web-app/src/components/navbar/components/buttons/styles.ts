import styled from "styled-components";
import Link from "next/link";

export const NavButtonStyled = styled(Link)<{ highlighted: boolean }>`
  margin: 0 auto;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  ${({ highlighted, theme }) =>
    highlighted
      ? `
    border-bottom: 5px solid ${theme.colors.accent};
    color: ${theme.colors.accent};
  `
      : null}
  display: flex;
  height: 100%;
  align-items: center;
  text-align: center;
  background-color: inherit;
  &:hover,
  &:focus,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.secondary};
    cursor: pointer;
  }
  justify-content: center;
  ${(p) =>
    p.highlighted
      ? `font-weight: 900;
    `
      : null}
`;

export const SignOutButtonStyled = styled.a`
  color: ${({ theme }) => theme.colors.text};
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  span {
    padding: 10px;
    display: inline-block;
  }
  svg {
    padding: 10px;
  }
`;
