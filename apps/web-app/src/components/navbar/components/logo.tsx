import { NavbarImageContainer } from "./image-container";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

const LogoImageContainer = styled(NavbarImageContainer)`
  a {
    display: inline-block;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    transition: opacity ease-in-out 0.4s;
    &:hover,
    &:focus-visible {
      opacity: 0.8;
    }
  }
`;

export const Logo = () => (
  <LogoImageContainer>
    <Link href={"/"}>
      <Image
        src="https://picsum.photos/50/50"
        width={50}
        height={50}
        alt="logo"
      />
    </Link>
  </LogoImageContainer>
);
