import styled from "styled-components";

const IconStyled = styled.i`
  color: black;
  cursor: pointer;
`;

export const InputIcon = ({ onClick, icon }) => {
  return (
    <IconStyled onClick={onClick}>{icon}</IconStyled>
  );
};
