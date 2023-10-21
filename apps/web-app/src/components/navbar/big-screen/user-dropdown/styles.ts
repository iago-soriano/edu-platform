import styled from "styled-components";
import { NavbarImageContainer } from "../../components/image-container";

export const ProfileImageContainer = styled(NavbarImageContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 5px;
  max-width: 150px;
  img {
    border-radius: 50px;
    border: 3px solid ${({ theme }) => theme.colors.accent};
  }
  p {
    padding: 0;
  }
`;
