import { Router } from "@infrastructure";
import { TabLinks } from "@components";

export default function DashboardLayout({ children }) {
  return (
    <div className="lg:px-7">
      <TabLinks
        tabs={[
          {
            title: "My Collections",
            activeRoute: Router.teacherBaseRoute,
            href: Router.teacherPrivateCollections,
          },
          { title: "Activities", activeRoute: Router.teacherActivities },
          {
            title: "Student Outputs",
            activeRoute: Router.teacherStudentOutputs,
          },
        ]}
        className="grid-cols-3 lg:mx-auto items-center justify-center w-full lg:w-[50%]"
      />
      {children}
    </div>
  );
}
