import styled from 'styled-components';

const imageDisplayNoneBreakpoint = '968px';
export const PageContainer = styled.main`
    background-color: ${(p) => p.theme.colors.primary};
    /* display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-grow: 1; */
    /* height: 80vh;
    white-space: nowrap; */
    display: grid;
    grid-template-columns: 1fr 2fr;
    height: 80vh;
    @media (max-width: ${imageDisplayNoneBreakpoint}) {
        grid-template-columns: 1fr;
    }
`;

export const FormContainer = styled.div`
    /* display: inline-block; */
    padding: 20px;
    /* max-width: 70%;
    width: 50%; */
    width: 40%;
    margin: 0 auto;

    @media (max-width: 1375px) {
        width: 80%;
    }
    @media (max-width: ${imageDisplayNoneBreakpoint}) {
        width: 70%;
    }
    @media (max-width: 600px) {
        width: 90%;
    }
    hr {
        margin: 30px 0;
    }
`;

export const ImageContainer = styled.div`
    padding: 50px;
    margin: 0 auto;

    @media (max-width: ${imageDisplayNoneBreakpoint}) {
        display: none;
    }
`;