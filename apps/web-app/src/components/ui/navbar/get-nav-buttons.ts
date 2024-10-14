type button = { header: string; route: string };
type navButtons = { left: button[]; right: button[] };

export const getNavButtons = (session) => {
  const navButtons: navButtons = {
    left: [{ header: "Home", route: "/home#hero" }],
    right: [],
  };

  if (session) {
    navButtons.right.push({ header: "My Activities", route: "/activities/my" });
    navButtons.right.push({
      header: "Trending Activities",
      route: "/activities/trending",
    });
  } else {
    navButtons.left.push(
      { header: "How it works", route: "/home#how-it-works" },
      { header: "Features", route: "/home#features" }
    );
  }

  return navButtons;
};
