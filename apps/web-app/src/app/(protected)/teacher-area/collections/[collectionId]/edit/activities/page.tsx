import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SSRAxios } from "@infrastructure";
import { ApiClient } from "@edu-platform/common";
import Client from "./client";

const pageSize = 10;

const Page = async ({ params: { collectionId: strId }, searchParams }) => {
  const collectionId = Number(strId);
  const queryClient = new QueryClient();

  const page = Number(searchParams?.page) || 0;

  await queryClient.prefetchQuery({
    queryKey: ["activities", { page, pageSize }],
    queryFn: () =>
      new ApiClient(SSRAxios).listActivitiesForOwner({
        collectionId,
        page,
        pageSize,
      }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Client collectionId={collectionId} page={page} pageSize={pageSize} />
    </HydrationBoundary>
  );
};

export default Page;
