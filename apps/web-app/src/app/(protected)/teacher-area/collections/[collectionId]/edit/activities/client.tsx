"use client";
import { Router } from "@infrastructure";
import {
  useListActivitiesForOwnerQuery,
  useCreateNewActivityMutation,
} from "@endpoints";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ActivityListingOwnership } from "@components";
const Page = ({ collectionId, pageSize, page }) => {
  const router = useRouter();

  const createActivityMutation = useCreateNewActivityMutation({
    onSuccess: (args) => {
      router.push(
        Router.editActivity({
          activityId: args?.activityId,
        })
      );
    },
  });
  const versionsQuery = useListActivitiesForOwnerQuery({
    collectionId,
    pageSize,
    page,
  });
  return (
    <div className="">
      <div className="w-full flex justify-end p-2 mt-5">
        <button
          onClick={() => createActivityMutation.mutate({ collectionId })}
          className="h-10 w-38 whitespace-nowrap bg-accent p-2 text-white rounded font-bold transition-opacity hover:opacity-80"
        >
          + New Activity
        </button>
      </div>
      <ActivityListingOwnership
        activityVersions={versionsQuery}
        router={router}
      />
    </div>
  );
};

export default Page;
