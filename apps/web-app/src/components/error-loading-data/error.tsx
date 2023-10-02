import styled from "styled-components";

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  svg {
    font-size: 3rem;
    padding: 20px;
  }
  p {
    font-style: italic;
    text-align: center;
  }
`;

export const Error = () => {

  return (
    <ErrorContainer>
    </ErrorContainer>
  );
};
