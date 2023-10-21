import styled from "styled-components";

export const PageContainer = styled.main`
  background-color: ${(p) => p.theme.colors.primary};
  min-height: 80vh;

  div#invalid-token {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const FormContainer = styled.div`
  padding: 20px;
  width: 40%;
  margin: 0 auto;

  @media (max-width: 1375px) {
    width: 80%;
  }
  @media (max-width: 968px) {
    width: 70%;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
  hr {
    margin: 30px 0;
  }
`;
