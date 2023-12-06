"use client";
import {
  useGetActivityVersionQuery,
  useSaveContentMutation,
} from "@infrastructure";
import { EditActivityHeader, InsertButtons } from "./components";

const Page = ({ params: { activityId, versionId } }) => {
  const versionQuery = useGetActivityVersionQuery({ activityId, versionId });
  const saveContentMutation = useSaveContentMutation({ activityId, versionId });

  return (
    <div>
      <EditActivityHeader activityId={activityId} versionId={versionId} />
      <InsertButtons />
    </div>
  );
};

export default Page;
