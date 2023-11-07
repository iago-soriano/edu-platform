import styled from "styled-components";
import { forwardRef } from "react";

export const StyledBurger = styled.button<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  width: 4rem;
  background: transparent;
  border: none;
  height: 4.7rem;

  cursor: pointer;
  overflow-x: hidden;
  padding: 1rem 0.5rem 0.5rem 1rem;

  transition: opacity ease-in-out 150ms;
  &:hover,
  &:focus {
    opacity: 0.8;
  }

  div {
    background-color: ${({ theme }) => theme.colors.text};

    width: 100%; //2rem
    height: 0.25rem;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) =>
        open
          ? `
        rotate(45deg);        
      `
          : `
        rotate(0);
      `};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) =>
        open
          ? `
        rotate(-45deg);
      `
          : `
        rotate(0);
      `};
    }
  }
`;

export const HamburguerButton = forwardRef<
  HTMLButtonElement,
  { open: boolean; onClick: () => void }
>(({ open, onClick }, ref) => {
  return (
    <StyledBurger ref={ref} open={open} onClick={onClick}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
});
