import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { preFetchPublic, preFetchPrivate } from "@endpoints";
import { ApiClient } from "@edu-platform/common/api";
import Client from "./client";

const queryClient = new QueryClient();

const Page = async ({ searchParams }) => {
  //searchParams opts into dynamic rendering
  const pagePrivate = Number(searchParams?.pagePrivate) || 0;

  await preFetchPrivate(queryClient, pagePrivate);

  const pagePublic = Number(searchParams?.pagePublic) || 0;

  await preFetchPublic(queryClient, pagePublic);

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
