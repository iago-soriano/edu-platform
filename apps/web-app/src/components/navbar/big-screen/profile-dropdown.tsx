import {
  HowItWorksButton,
  DashboardButton,
  SignInButton,
  SignUpButton,
  ProductButton,
  SignOutButton,
  MyProfileButton,
  Logo,
  NavButton,
  Dropdown,
} from "../components";

export const ProfileDropDown = ({
  isDropdownOpen,
  handleSignOut,
  addClickOutsideRef,
  currentPath,
}) => {
  return (
    <div ref={addClickOutsideRef} className="w-full flex flex-row justify-end">
      <Dropdown className="w-[200px] flex flex-col" open={isDropdownOpen}>
        <MyProfileButton
          currentPath={currentPath}
          Component={({ children, ...rest }) => (
            <NavButton {...rest} className={"w-full p-4"}>
              {children}
            </NavButton>
          )}
        />
        <SignOutButton signOut={handleSignOut} />
      </Dropdown>
    </div>
  );
};
