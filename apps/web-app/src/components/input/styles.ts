import styled from "styled-components";

export const InputIconContainer = styled.span`
  position: absolute;
  top: 42px;
  right: 10px;
`;

const subInputP = styled.p`
  text-align: left;
  padding: 5px 0;
  margin-top: 8px;
  margin-bottom: 0px;
`;

export const ErrorMessageContainer = styled(subInputP)`
  color: ${(p) => p.theme.colors.error};
  font-weight: bold;
`;

export const InputLabelStyled = styled.label`
  display: block;
  position: relative;
`;
