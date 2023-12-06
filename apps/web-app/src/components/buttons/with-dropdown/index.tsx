import { getChildrenOnDisplayName, useClickOutside } from "@infrastructure";
import { useState } from "react";
import { Dropdown } from "@components";

export const ButtonWithDropdown = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const addRef = useClickOutside(() => {
    setDrawerOpen(false);
  });
  const buttonText = getChildrenOnDisplayName(children, "text");
  const drawerItems = getChildrenOnDisplayName(children, "drawerItem");

  return (
    <div ref={addRef}>
      <button
        onClick={() => setDrawerOpen((c) => !c)}
        className="flex bg-accent p-2 text-white rounded hover:bg-opacity-90"
      >
        {buttonText}
      </button>
      <Dropdown open={drawerOpen}>
        <div className="flex flex-col">{drawerItems}</div>
      </Dropdown>
    </div>
  );
};

const Text = ({ children }) => children;
Text.displayName = "text";
ButtonWithDropdown.Text = Text;

const DrawerItem = ({ children }) => {
  return (
    <button className="min-w-[200px] p-2 bg-surface2 hover:bg-surface3">
      {children}
    </button>
  );
};
DrawerItem.displayName = "drawerItem";
ButtonWithDropdown.DrawerItem = DrawerItem;
