"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCreateNewActivityMutation } from "@endpoints";
import { Spinner, Tabs, ToggleText } from "@components";

const Page = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createActivityMutation = useCreateNewActivityMutation({
    onSuccess: ({ activityId, versionId }) => {
      router.push(`/activity/${activityId}/version/${versionId}/edit`);
    },
  });

  return (
    <div className="min-h-[70vh]">
      <div className="flex justify-between p-2"></div>
      <div className="flex justify-between p-2">
        <ToggleText
          buttons={[
            {
              text: "Ativas",
              href: "/dashboard/my-activities",
              isSelected: !searchParams.get("status"),
            },
            {
              text: "Arquivadas",
              href: "/dashboard/my-activities?status=Archived",
              isSelected: searchParams.get("status") === "Archived",
            },
          ]}
        />
        <button
          disabled={createActivityMutation.isPending}
          onClick={() => createActivityMutation.mutate()}
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
