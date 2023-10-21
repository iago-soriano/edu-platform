import styled from "styled-components";
import { Container as GenericNavbarContainer } from "../styles";
import { NavButtonStyled, Dropdown } from "../components";
import Link from "next/link";

export const DrawerMenuStyled = styled(Dropdown)`
  width: 100%;
`;

export const Container = styled(GenericNavbarContainer)`
  justify-content: space-between;
`;

export const ActionButton = styled(Link)<{ highlighted: boolean }>`
  color: white;
  font-weight: ${({ highlighted }) => (highlighted ? 900 : "normal")};

  display: inline-block;
  /* margin: 100%; */
  padding: 10px;
  background-color: #04aa6d;
  border-radius: 5px;
  transition: opacity ease-in-out 0.4s;
  &:hover,
  &:focus-visible {
    opacity: 0.8;
  }
`;
