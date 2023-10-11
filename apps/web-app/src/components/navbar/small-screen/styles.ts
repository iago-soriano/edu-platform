import styled from "styled-components";
import { Container as GenericNavbarContainer } from "../styles";
import { NavButtonStyled, Dropdown } from '../components';

export const DrawerMenuStyled = styled(Dropdown)`
  width: 95%;
`;

export const Container = styled(GenericNavbarContainer)`
    position: relative;
    justify-content: space-between;
`;