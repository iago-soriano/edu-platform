import styled from "styled-components";
import { FlexCentered, Container as GenericNavbarContainer } from "../styles";

export const DrawerMenuStyled = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
`;

export const DrawerMenuItemStyled = styled.div<{ highlighted: boolean}>`
  background-color: ${({ highlighted }) => highlighted ? 'pink' : 'inherit'};
  color: ${(p) => p.theme.colors.text};

  width: 90%;
    margin: 0 auto;
    a {
      &:hover {
        background-color: ${(p) => p.theme.colors.secondary};
        cursor: pointer;
      }
      justify-content: start;
      padding: 15px;
      display: inline-block;
      width: 100%;
    }
`;

export const HamburguerButtonContainer = styled(FlexCentered)`
  width: 55px;
  cursor: pointer;
`;

export const Container = styled(GenericNavbarContainer)`
    justify-content: space-between;
`;