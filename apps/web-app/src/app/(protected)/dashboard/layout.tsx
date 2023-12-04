"use client";
import { useRouter, usePathname } from "next/navigation";
import { useCreateActivityMutation } from "@infrastructure";
import { Spinner, Tabs } from "@components";

const Page = ({ children }) => {
  const router = useRouter();
  const createActivityMutation = useCreateActivityMutation({
    onSuccess: ({ activityId, versionId }) => {
      router.push(`/edit/activity/${activityId}/version/${versionId}`);
    },
  });

  return (
    <div className="min-h-[70vh]">
      <div className="flex justify-between p-2">
        <Tabs>
          <Tabs.Item href="my-activities">Minhas atividades</Tabs.Item>
          <Tabs.Item href="student-outputs">Produções dos estudantes</Tabs.Item>
        </Tabs>
        <div className="flex flex-col justify-center">
          <button
            disabled={createActivityMutation.isPending}
            onClick={() => createActivityMutation.mutate({})}
            className="h-10 w-36 whitespace-nowrap bg-accent p-2 text-white rounded font-bold transition-opacity hover:opacity-80"
          >
            {createActivityMutation.isPending ||
            createActivityMutation.isSuccess ? (
              <Spinner />
            ) : (
              " + Nova atividade"
            )}
          </button>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Page;
