import styled from "styled-components";
import { FlexCentered, Container as GenericNavbarContainer } from "../styles";

export const Container = styled(GenericNavbarContainer)`
    justify-content: space-between;
`;

export const BarButtonContainer = styled(FlexCentered)`
  flex-direction: row;
  margin: 0 5px;
  justify-content: end;
`;

export const AuthenticatedSectionContainer = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: row;
  margin: 0 5px;
  height: 100%;
`;

export const Button = styled.button<{ highlighted: boolean }>`
   margin: 0 auto;
    a {
      display: flex;
      height: 100%;
      align-items: center;
      min-width: 120px;
      text-align: center;
      background-color: inherit;
      &:hover {
        background-color: ${(p) => p.theme.colors.secondary};
        cursor: pointer;
      }
      justify-content: center;
      ${(p) =>
        p.highlighted
          ? `font-weight: 900;
        `
          : null}
    }
`;