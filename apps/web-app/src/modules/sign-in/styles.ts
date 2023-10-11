import styled from 'styled-components';

export const PageContainer = styled.main`
    background-color: ${(p) => p.theme.colors.primary};
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-grow: 1;
`;

export const FormContainer = styled.div`
    padding: 20px;
    width: 100%;
`;

export const ImageContainer = styled.div`
    padding: 50px;
    @media (max-width: 968px) {
        display: none;
    }
`;