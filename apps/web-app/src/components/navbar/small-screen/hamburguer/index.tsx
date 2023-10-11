import styled from "styled-components";
import { FlexCentered } from '@styles';

export const StyledBurger = styled.button<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* width: 2rem; */
  height: 100%;
  background: transparent;
  border: none;
  padding: 0;
  z-index: 10;
  cursor: pointer;
  overflow-x: hidden;  
  padding: 25px 15px;

  &:focus {
    outline: none;
  }

  div {
    background-color: ${({theme}) => theme.colors.text};

    width: 2rem;
    height: 0.25rem;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      /* transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")}; */
      transform: ${({ open }) => (open ? `
        rotate(45deg) translate(3px, 3px);        
      ` : `
        rotate(0);
      `)};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? `
        rotate(-45deg);
      ` : `
        rotate(0);
      `)};
    }
  }
`;

const HamburguerButtonContainer = styled(FlexCentered)`
  width: 55px;
  height: 100%;
  cursor: pointer;
`;

export const HamburguerButton = ({ open, onClick }) => {
  return (
    <HamburguerButtonContainer>
      <StyledBurger open={open} onClick={onClick}>
        <div />
        <div />
        <div />
      </StyledBurger>
    </HamburguerButtonContainer>
  );
};
