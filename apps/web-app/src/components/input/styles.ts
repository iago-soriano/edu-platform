import styled from "styled-components";

export const LabelStyled = styled.span`
  font-weight: bold;
  display: inline-block;
  margin-bottom: 8px;
`;

export const InputStyled = styled.input<{ error: any }>`
  display: block;
  padding: 15px;
  border-radius: 3px;
  width: 100%;
  border: ${(p) => (p.error ? `3px solid ${p.theme.colors.error}` : "1px solid gray")};
  background-color: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.text};
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${(p) => p.theme.colors.text};
    opacity: 0.5; /* Firefox */
  }
`;

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

export const InstructionsContainer = styled(subInputP)`
  color: ${(p) => p.theme.colors.text};
`;

export const InputLabelStyled = styled.label`
  display: block;
  color: ${(p) => p.theme.colors.text};
  position: relative;
`;

