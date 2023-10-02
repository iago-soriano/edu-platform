import styled from "styled-components";

export const FlexCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Container = styled.nav`
  width: 100%;
  background-color: ${(p) => p.theme.colors.primary};
  display: flex;
  flex-direction: row;
  height: 10vh;
  border-bottom: 3px solid ${(p) => p.theme.colors.accent};
`;

