import { Router } from "@infrastructure";
import { TabLinks } from "@components";
import { NewCollectionButton } from "./_new-collection-button";
import { Suspense } from "react";

export default function CollectionsDashboardLayout({ children }) {
  return (
    <div className="">
      <div className="w-full flex flex-row flex-wrap justify-between items-center">
        <TabLinks
          tabs={[
            {
              title: "Private Collections",
              activeRoute: `${Router.teacherPrivateCollections.split("?")[0]}`,
              href: Router.teacherPrivateCollections,
            },
            {
              title: "Public Collections",
              activeRoute: `${Router.teacherPublicCollections.split("?")[0]}`,
              href: Router.teacherPublicCollections,
            },
          ]}
          className="grid-cols-2 w-full lg:w-[50%] md:w-[70%] items-start justify-center lg:mr-2 mx-0 "
        />
        <NewCollectionButton />
      </div>
      <Suspense fallback="Loading...">{children}</Suspense>
    </div>
  );
}
