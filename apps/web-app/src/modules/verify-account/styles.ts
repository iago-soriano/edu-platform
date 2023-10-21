import styled from "styled-components";

export const PageStyled = styled.div`
  display: flex;
  height: 80vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  h1 {
    display: block;
  }

  h3 {
    color: gray;
  }

  a {
    color: ${({ theme }) => theme.colors.text};
  }

  /* div#spinner {
        width: 200px;
        height: 200px;
        max-width: 200px;
    } */
`;
