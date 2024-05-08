import { Router } from "@infrastructure";
import { TabsLink } from "@components";

export default function DashboardLayout({ children }) {
  return (
    <div className="">
      <TabsLink
        tabs={[
          { title: "My Collections", route: Router.teacherCollections },
          { title: "Activities", route: Router.teacherActivities },
          { title: "Student Outputs", route: Router.teacherActivities },
        ]}
      />
      {children}
    </div>
  );
}
