import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
// import { axios } from "@infrastructure";
import { GetActivityVersionResponseBody } from "@edu-platform/common";
import Version from "./client";
import posthog from "posthog-js";
import { redirect } from "next/navigation";

const Page = async ({ params: { activityId, versionId } }) => {
  const queryClient = new QueryClient();

  posthog.capture("activity page", { property: `${activityId}/${versionId}` });

  // await queryClient.prefetchQuery({
  //   queryKey: [`version-${versionId}`],
  //   queryFn: () =>
  //     axios.get.bind(axios)(`activity/${activityId}/version/${versionId}`),
  // });

  // const versionQuery: GetActivityVersionResponseBody = queryClient.getQueryData(
  //   ["version", activityId, versionId]
  // );

  // if (versionQuery?.status === "Published")
  //   redirect(`/activity/${activityId}/version/${versionId}/do`);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Version params={{ activityId, versionId }} />
    </HydrationBoundary>
  );
};

export default Page;
