import styled from "styled-components";
import { Container as GenericNavbarContainer } from "../styles";
import { NavButtonStyled } from "../components";
import { Dropdown } from "../components";
import Link from "next/link";

export const Container = styled(GenericNavbarContainer)`
  justify-content: space-between;
  overflow: hidden;
`;

export const AuthenticatedSectionContainer = styled.div`
  min-width: 100px;
  display: flex;
  flex-direction: row;
  margin: 0 5px;
  height: 100%;
`;

export const Button = styled(NavButtonStyled)`
  margin: 0 10px;
  width: 80px;
`;

export const ActionButton = styled(Link)<{ highlighted: boolean }>`
  color: white;
  font-weight: ${({ highlighted }) => (highlighted ? 900 : "normal")};
  display: inline-block;
  margin: auto 0;
  padding: 10px;
  background-color: #04aa6d;
  border-radius: 5px;
  transition: opacity ease-in-out 0.4s;
  &:hover,
  &:focus-visible {
    opacity: 0.8;
  }
`;

export const ProfileDropdownContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
`;

export const ProfileDropdown = styled(Dropdown)`
  width: 200px;
  display: flex;
  flex-direction: column;
`;
