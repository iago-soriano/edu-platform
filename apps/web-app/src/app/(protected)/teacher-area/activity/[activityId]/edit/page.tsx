import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Client from "./client";
import posthog from "posthog-js";
import { SSRAxios } from "@infrastructure";
import { ApiClient } from "@edu-platform/common/api";

const Page = async ({ params: { activityId } }) => {
  const queryClient = new QueryClient();

  posthog.capture("activity page", { property: `${activityId}` });

  await queryClient.prefetchQuery({
    queryKey: ["versions/draft", { activityId }],
    queryFn: () =>
      new ApiClient(SSRAxios).getDraft({
        activityId,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Client params={{ activityId }} />
    </HydrationBoundary>
  );
};

export default Page;
