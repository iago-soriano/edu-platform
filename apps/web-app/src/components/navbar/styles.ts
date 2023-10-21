import styled from "styled-components";

export const Container = styled.nav`
  max-width: 100vw;
  background-color: ${(p) => p.theme.colors.primary};
  display: flex;
  flex-direction: row;
  height: 10vh;
  min-height: 90px;
  /* border-bottom: 3px solid ${(p) => p.theme.colors.accent}; */
`;
