"use client";
import { useRouter } from "next/navigation";
import { useCreateActivityMutation } from "@infrastructure";
import { Spinner, Tabs, ToggleText } from "@components";

const Page = ({ children }) => {
  const router = useRouter();
  const createActivityMutation = useCreateActivityMutation({
    onSuccess: ({ activityId, versionId }) => {
      router.push(`/activity/${activityId}/version/${versionId}/edit`);
    },
  });

  return (
    <div className="min-h-[70vh]">
      <div className="flex justify-between p-2">
        {/* <Tabs>
          <Tabs.Item href="my-activities/draft">Minhas atividades</Tabs.Item>
          <Tabs.Item href="student-outputs">Produções dos estudantes</Tabs.Item>
        </Tabs> */}
        {/* <div className="flex flex-col justify-center">
          
        </div> */}
      </div>
      <div className="flex justify-between p-2">
        <ToggleText
          buttons={[
            { text: "Publicadas", href: "/dashboard/my-activities/published" },
            { text: "Rascunhos", href: "/dashboard/my-activities/draft" },
            { text: "Arquivadas", href: "/dashboard/my-activities/archived" },
          ]}
        />
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
      {children}
    </div>
  );
};

export default Page;
