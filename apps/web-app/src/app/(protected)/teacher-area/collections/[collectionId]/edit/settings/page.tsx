import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Client from "./client";
import { SSRAxios } from "@infrastructure";
import { ApiClient } from "@edu-platform/common";

const Page = async ({ params: { collectionId: strId } }) => {
  const queryClient = new QueryClient();
  const collectionId = Number(strId);

  await queryClient.prefetchQuery({
    queryKey: ["collection", { collectionId }],
    queryFn: () => new ApiClient(SSRAxios).getCollection({ collectionId }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Client params={{ collectionId }} />
    </HydrationBoundary>
  );
};

export default Page;
