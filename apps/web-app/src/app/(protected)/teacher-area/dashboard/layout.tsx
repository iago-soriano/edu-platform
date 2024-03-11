"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components";
import { Router } from "@infrastructure";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathName = usePathname();
  const router = useRouter();

  // TODO: some redirecting
  //if(pathName?.split("/").pop()) {
  //redirect(`${Router.teacherHome}/overview`);
  //}
  return (
    <div className="p-3">
      <Tabs
        value={pathName?.split("/").pop()}
        onValueChange={(e) => {
          console.log(e);
          router.push(`${Router.teacherHome}/${e}`);
        }}
      >
        <TabsList className="grid w-full m-0 lg:w-[60%] lg:mr-auto grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="student-outputs">Student Outputs</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">{children}</TabsContent>
        <TabsContent value="activities">{children}</TabsContent>
        <TabsContent value="student-outputs">{children}</TabsContent>
      </Tabs>
    </div>
  );
}
