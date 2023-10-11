import styled from "styled-components";

export const ButtonStyled = styled.button`
  width: 100%;
  min-width: 100px;
  display: block;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.secondary};
  height: 40px;
  border-radius: 5px;
  padding: 7px;
  cursor: pointer;
  border: none;
  :active {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  :hover:enabled:not(:active) {
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: inset 0px 0px 0px 3px ${({ theme }) => theme.colors.secondary};
  }

  :disabled {
    cursor: not-allowed;
    background-color: gray
  }
`;
