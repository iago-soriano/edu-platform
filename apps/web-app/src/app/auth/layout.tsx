import { useAuth } from "@contexts";
import {
  PasswordInput,
  Input,
  Form,
  Footer,
  FormButton,
  ErrorAlert,
  Heading,
  GoogleSignInButton,
  errorToast,
  SignInUpPageImage,
  SignInUpPageContainer,
  SignInUpFormContainer,
  Separator,
} from "@components";
import { signInSchema } from "@infrastructure";
import { useEffect } from "react";

export const FormOnTheRightImageOnLeft = ({ children }) => {
  return (
    <>
      <SignInUpPageContainer>
        <SignInUpPageImage />
        {children}
      </SignInUpPageContainer>
      {/* <Footer /> */}
    </>
  );
};
