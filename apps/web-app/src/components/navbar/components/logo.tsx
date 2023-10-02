import {
    FlexCentered,
} from "../styles";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";


const LogoImageContainer = styled(FlexCentered)`
  flex-direction: row;
  margin: 0 5px;
  justify-content: start;
  img {
    margin: 10px;
    cursor: pointer;
  }
`;

export const Logo = () => (
    <LogoImageContainer>
        <Link href={"/"}>
            <Image src="/images/logo.png" width={50} height={50} alt="logo" />
        </Link>
    </LogoImageContainer>  
);