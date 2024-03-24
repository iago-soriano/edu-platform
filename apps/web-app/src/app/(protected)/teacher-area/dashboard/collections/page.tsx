import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SSRAxios } from "@infrastructure";
import { ApiClient } from "@edu-platform/common";
import Client from "./client";

const pageSize = 1;

const Page = async ({ searchParams }) => {
  const queryClient = new QueryClient();

  const pagePrivate = Number(searchParams?.pagePrivate) || 0;

  await queryClient.prefetchQuery({
    queryKey: ["collections", { isPrivate: true, page: pagePrivate, pageSize }],
    queryFn: () =>
      new ApiClient(SSRAxios).listCollections({
        byOwnership: true,
        isPrivate: true,
        page: pagePrivate,
        pageSize,
      }),
  });

  const pagePublic = Number(searchParams?.pagePublic) || 0;

  await queryClient.prefetchQuery({
    queryKey: ["collections", { isPrivate: false, page: pagePublic, pageSize }],
    queryFn: () =>
      new ApiClient(SSRAxios).listCollections({
        byOwnership: true,
        isPrivate: false,
        page: pagePublic,
        pageSize,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Client
        currActiveTab={searchParams?.activeTab || "private"}
        pagePublic={pagePublic}
        pagePrivate={pagePrivate}
      />
    </HydrationBoundary>
  );
};

export default Page;
