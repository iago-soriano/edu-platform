import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
// import { axios } from "@infrastructure";
import Version from "./client";
import posthog from "posthog-js";

const Page = async ({ params: { activityId, versionId } }) => {
  const queryClient = new QueryClient();

  posthog.capture("activity page", { property: `${activityId}/${versionId}` });

  // await queryClient.prefetchQuery({
  //   queryKey: ["version", activityId, versionId],
  //   queryFn: () =>
  //     axios.get.bind(axios)(`activity/${activityId}/version/${versionId}`),
  // });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Version params={{ activityId }} />
    </HydrationBoundary>
  );
};

export default Page;
