import styled from 'styled-components';

const AStyled = styled.a`
    display: inline-block;
    padding: 10px 3px;
    color: ${({theme}) => theme.colors.text};
    text-decoration: underline;
    margin-bottom: 15px;
    :hover {
        color: ${({theme}) => theme.colors.accent};
    }
`;

export const ForgotPassword = () => {
    return (
        <AStyled href="/change-password-request">
            Esqueceu sua senha?
        </AStyled>
    )
}