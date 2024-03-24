import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { axios } from "@infrastructure";
import { ApiClient } from "@edu-platform/common";
import Client from "./client";
const Page = async ({ params: { collectionId: strId } }) => {
  const queryClient = new QueryClient();
  const collectionId = Number(strId);

  await queryClient.prefetchQuery({
    queryKey: ["collection", { collectionId }],
    queryFn: () => new ApiClient(axios).getCollection({ collectionId }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Client params={{ collectionId }} />
    </HydrationBoundary>
  );
};

export default Page;
