import { NavbarImageContainer } from "./image-container";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

const LogoImageContainer = styled(NavbarImageContainer)`

`;

export const Logo = () => (
    <LogoImageContainer>
        <Link href={"/"}>
          <Image src="https://picsum.photos/50/50" width={50} height={50} alt="logo" />
        </Link>
    </LogoImageContainer>  
);