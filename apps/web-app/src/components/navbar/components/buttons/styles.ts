import styled from 'styled-components';

export const NavButtonStyled = styled.button<{ highlighted: boolean }>`
   margin: 0 auto;
   border: none;
   color: ${({ theme }) => theme.colors.text};
   ${({ highlighted, theme }) => highlighted ? `
    border-bottom: 5px solid ${theme.colors.accent};
    color: ${theme.colors.accent};
  ` : null}
    a {
      display: flex;
      height: 100%;
      align-items: center;
      width: 80px;
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

export const SignOutButtonStyled = styled.a`
   color: ${({ theme }) => theme.colors.text};
    :hover {
        text-decoration: underline;
        cursor: pointer;
    }
    display: flex;
    flex-direction: row;
    align-items: center;
    span {
        padding: 10px;
        display: inline-block;
    }
    svg {
        padding: 10px;
    }
`;