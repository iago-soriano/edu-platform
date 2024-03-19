"use client";
import { Router } from "@infrastructure";
import {
  useSaveCollectionMutation,
  useGetCollectionQuery,
  useCreateNewActivityMutation,
} from "@endpoints";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ActivityListingOwnership } from "@components";
const Page = ({ params: { collectionId: strId } }) => {
  const collectionId = Number(strId);
  const collectionQuery = useGetCollectionQuery({ collectionId });

  const router = useRouter();

  const createActivityMutation = useCreateNewActivityMutation({
    onSuccess: (args) => {
      router.push(
        Router.editActivity({
          activityId: args?.activityId,
          versionId: args?.versionId,
        })
      );
    },
  });
  return (
    <div className="">
      <div className="w-full flex justify-between p-2 mt-5">
        <h5>{collectionQuery.data?.name}</h5>
        <button
          onClick={() => createActivityMutation.mutate({ collectionId })}
          className="h-10 w-38 whitespace-nowrap bg-accent p-2 text-white rounded font-bold transition-opacity hover:opacity-80"
        >
          + New Activity
        </button>
      </div>
      <ActivityListingOwnership collectionId={collectionId} />
    </div>
  );
};

export default Page;
