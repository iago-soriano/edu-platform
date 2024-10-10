export const getNavButtons = (session) => {
  const navButtons = [{ header: "Home", route: "/home#hero" }];

  if (session) {
    navButtons.push({ header: "Activities", route: "/activities/trending" });
  } else {
    navButtons.push(
      { header: "How it works", route: "/home#how-it-works" },
      { header: "Features", route: "/home#features" }
    );
  }

  return navButtons;
};
