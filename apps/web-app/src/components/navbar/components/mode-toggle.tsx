import { Toggle } from "@components";
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    color: ${({theme}) => theme.colors.text};
    justify-content: center;
    align-items: center;
`;
export const ModeToggle = ({ mode, setMode }) => (
    <Container>
        {mode}
        <Toggle
            onChange={() => setMode(mode === "dark" ? "light" : "dark")}
            checked={mode === "dark"}
            label=""
        />
    </Container>
);
