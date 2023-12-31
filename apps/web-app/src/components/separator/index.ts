import styled from "styled-components";

export const Separator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  margin: 20px 0;
  color: ${({ theme }) => theme.colors.text};

  :before,
  :after {
    content: "";
    flex: 1;
    border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  }

  :not(:empty)::before {
    margin-right: 0.25em;
  }

  :not(:empty)::after {
    margin-left: 0.25em;
  }
`;
