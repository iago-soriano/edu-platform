import { Toggle } from "@components";

export const ModeToggle = ({ mode, setMode }) => (
    <Toggle
        onChange={() => setMode(mode === "dark" ? "light" : "dark")}
        checked={mode === "dark"}
        label=""
    />
);
