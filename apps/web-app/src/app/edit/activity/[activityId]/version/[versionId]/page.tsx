import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { axios } from "@infrastructure";
import Version from "./client";

const Page = async ({ params: { activityId, versionId } }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["version", activityId, versionId],
    queryFn: () =>
      axios.get.bind(axios)(`activity/${activityId}/version/${versionId}`),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Version params={{ activityId, versionId }} />
    </HydrationBoundary>
  );
};

export default Page;
