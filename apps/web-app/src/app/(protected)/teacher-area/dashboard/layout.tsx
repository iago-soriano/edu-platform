"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components";
import { Router } from "@infrastructure";
import { useRouter, redirect, usePathname } from "next/navigation";
import { headers } from "next/headers";

export default function DashboardLayout({ children }) {
  const pathName = usePathname();
  const router = useRouter();

  const headersList = headers();
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("referer") || "";

  return (
    <div className="p-3">
      <Tabs
        value={pathName}
        onValueChange={(e) => {
          router.push(e);
        }}
      >
        <TabsList className="grid w-full m-0 lg:w-[60%] lg:mr-auto grid-cols-3">
          <TabsTrigger value={Router.teacherCollections}>
            My Collections
          </TabsTrigger>
          <TabsTrigger value={Router.teacherActivities}>Activities</TabsTrigger>
          <TabsTrigger value={Router.teacherStudentOutputs}>
            Student Outputs
          </TabsTrigger>
        </TabsList>
        <TabsContent value={Router.teacherCollections}>{children}</TabsContent>
        <TabsContent value={Router.teacherActivities}>{children}</TabsContent>
        <TabsContent value={Router.teacherStudentOutputs}>
          {children}
        </TabsContent>
      </Tabs>
    </div>
  );
}
