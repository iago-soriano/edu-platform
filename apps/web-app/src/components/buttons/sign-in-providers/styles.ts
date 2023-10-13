import styled from 'styled-components';

export const ProviderButtonContainer = styled.button`
    width: 100%;
    border-radius: 5px;
    padding: 9px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 15px;
    background-color: white;
    border: 1px solid gray;
    cursor: pointer;
    img {
        padding: 0px 20px;
        border-right: 1px solid black;
    }
    span {
        padding: 5px;
        padding-left: 20px;
    }
`;