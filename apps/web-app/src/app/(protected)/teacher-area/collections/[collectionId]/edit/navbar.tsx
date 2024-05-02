"use client";
import { usePathname } from "next/navigation";
import { SideNav } from "@components";
import {
  useGetCollectionQuery,
  useCreateNewActivityMutation,
} from "@endpoints";

export const CollectionsSideNav = ({ collectionId }) => {
  const path = usePathname();
  const collectionQuery = useGetCollectionQuery({ collectionId });

  const tabs = [
    { title: "Settings", href: "settings" },
    { title: "Activities", href: "activities", icon: <span>{}</span> }, // TODO: get total os student participants in get by id collection query and display here
  ];

  if (collectionQuery?.data?.isPrivate)
    tabs.push({ title: "Students", href: "students" });

  return (
    <div>
      <h5>{collectionQuery?.data?.name}</h5>
      <SideNav tabs={tabs} active={path.split("/").pop()} />
    </div>
  );
};
