"use client";
import { getChildrenOnDisplayName, useClickOutside } from "@infrastructure";
import { useState, cloneElement, ReactNode } from "react";
import { Dropdown } from "@components";
import { twMerge } from "tailwind-merge";

export const ButtonWithDropdown = ({
  children,
  up,
  right,
}: {
  children: unknown;
  up?: boolean;
  right?: boolean;
}) => {
  const positionY = `${up ? "bottom-[100%]" : "top-[100%]"}`;
  const positionX = `${right ? "" : "right-[0%]"}`;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const addRef = useClickOutside(() => {
    setDrawerOpen(false);
  });
  const buttonText = getChildrenOnDisplayName(children, "text")[0];
  const drawerItems = getChildrenOnDisplayName(children, "drawerItem");

  return (
    <div className="relative">
      <Dropdown
        className={twMerge("absolute", positionX, positionY)}
        open={drawerOpen}
      >
        <div className="flex flex-col">{drawerItems}</div>
      </Dropdown>
      {cloneElement(buttonText, {
        onClick: () => setDrawerOpen((c) => !c),
      })}
    </div>
  );
};

const Text = ({ children, className, ...rest }) => (
  <button {...rest} className={className}>
    {children}
  </button>
);
Text.displayName = "text";
ButtonWithDropdown.Text = Text;

const DrawerItem = ({
  children,
  className,
  ...rest
}: {
  children: ReactNode;
  onClick?: (args: unknown) => unknown;
  className?: string;
}) => {
  return (
    <button
      {...rest}
      className={twMerge(
        "min-w-[200px] p-2 bg-surface2 hover:bg-surface3",
        className
      )}
    >
      {children}
    </button>
  );
};
DrawerItem.displayName = "drawerItem";
ButtonWithDropdown.DrawerItem = DrawerItem;
