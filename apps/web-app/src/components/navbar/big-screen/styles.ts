import styled from "styled-components";
import { Container as GenericNavbarContainer } from "../styles";
import { NavButtonStyled } from '../components';

export const Container = styled(GenericNavbarContainer)`
    justify-content: space-between;
    overflow: hidden;
`;

export const AuthenticatedSectionContainer = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: row;
  margin: 0 5px;
  height: 100%;
`;

export const Button = styled(NavButtonStyled)`
  background-color: inherit;
  height: 100%;
`;