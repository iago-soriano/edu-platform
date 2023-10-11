import styled from 'styled-components';

export const SpinnerStyled  = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    &:after {
        content: "";
        border: 5px solid white;
        border-top-color: gray;
        aspect-ratio: 1;
        height: 100%;
        box-sizing: border-box;
        border-radius: 50%;
        display: block;
        animation: loading 1.5s linear infinite;
    }

    @keyframes loading {
        from { transform: rotate(0turn) }
        to { transform: rotate(1turn) }
    }
`;

export const Spinner = () => <SpinnerStyled />