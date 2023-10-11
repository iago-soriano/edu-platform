import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from 'react';
import { useColorTheme, useAuth } from "@contexts";
import { useRouter } from 'next/router'
import { SmallScreenNavbar } from "./small-screen";
import { BigScreenNavbar } from './big-screen';
import { ModeToggle } from "./components";
import { Container } from './styles';

export const Navbar = () => {
  const {
    mode,
    setMode,
    theme: { responsiveBreakpoint },
  } = useColorTheme();
  const isBigScreen = useMediaQuery({ minWidth: 900 });
  const router = useRouter();
  const { user, isAuthenticated, signOut } = useAuth();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleSignOut = () => {
    signOut.mutate({});
    // router.push("/");
  };

  if(hasMounted) {
    if(isBigScreen) return (
      <BigScreenNavbar 
        currentPath={router.pathname}
        modeToggle={<ModeToggle setMode={setMode} mode={mode}/>}
        user={user}
        isAuthenticated={isAuthenticated}
        signOut={handleSignOut}
      />
    );
    return (
      <SmallScreenNavbar 
        currentPath={router.pathname}
        modeToggle={<ModeToggle setMode={setMode} mode={mode}/>}
        user={user}
        isAuthenticated={isAuthenticated}
        signOut={handleSignOut}
      /> 
    );
  }

  return <Container />
}