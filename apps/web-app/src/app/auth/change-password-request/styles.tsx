import styled from "styled-components";

export const PageContainer = styled.main`
  background-color: ${(p) => p.theme.colors.primary};
  min-height: 80vh;
  display: flex;
  align-items: center;
`;

export const FormContainer = styled.div`
  padding: 20px;
  width: 40%;
  margin: auto;

  @media (max-width: 1375px) {
    width: 70%;
  }
  @media (max-width: 968px) {
    width: 70%;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
`;
