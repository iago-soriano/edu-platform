import styled from "styled-components";

export const NavbarImageContainer = styled.div`
  margin: 0 5px;
  cursor: pointer;

  p {
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
    padding: 5px;
    font-weight: 700;
  }
`;
