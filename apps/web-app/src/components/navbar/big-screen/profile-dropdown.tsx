import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { BaseNavbarButton } from "../base-button";
import { Button } from "components/ui/Button";

const SignOutButton = ({ signOut }) => (
  <Button
    onClick={signOut}
    className="hover:underline hover:opacity-70 hover:cursor-pointer flex flex-row items-center mx-auto w-full justify-center"
    //withIcon="SIGN_OUT"
  >
    Sair
  </Button>
);

export const ProfileDropDown = ({
  isDropdownOpen,
  handleSignOut,
  addClickOutsideRef,
}) => {
  return (
    <div ref={addClickOutsideRef} className="w-full flex flex-row justify-end">
      <DropdownMenu open={isDropdownOpen}>
        <BaseNavbarButton path="/auth/my-profile">Minha conta</BaseNavbarButton>
        <SignOutButton signOut={handleSignOut} />
      </DropdownMenu>
    </div>
  );
};
