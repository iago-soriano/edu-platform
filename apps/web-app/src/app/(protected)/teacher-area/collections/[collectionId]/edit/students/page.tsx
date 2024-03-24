import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { axios } from "@infrastructure";
import { ApiClient } from "@edu-platform/common";
import Client, { pageSize } from "./client";

const Page = async ({ params: { collectionId: strId }, searchParams }) => {
  const collectionId = Number(strId);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["collections", { isPrivate: true }],
    queryFn: () =>
      new ApiClient(axios).listCollections({
        byOwnership: true,
        isPrivate: true,
        page: searchParams?.pagePrivate,
        pageSize,
      }),
  });

  await queryClient.prefetchQuery({
    queryKey: ["collections", { isPrivate: true }],
    queryFn: () =>
      new ApiClient(axios).listCollections({
        byOwnership: true,
        isPrivate: false,
        page: searchParams?.pagePublic,
        pageSize,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Client collectionId={collectionId} />
    </HydrationBoundary>
  );
};

export default Page;
