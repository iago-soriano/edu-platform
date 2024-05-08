import { CollectionsSideNav } from "./navbar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SSRAxios } from "@infrastructure";
import { ApiClient } from "@edu-platform/common/api";

const Page = async ({ children, params }) => {
  const queryClient = new QueryClient();
  const collectionId = Number(params.collectionId);

  await queryClient.prefetchQuery({
    queryKey: ["collection", { collectionId }],
    queryFn: () => new ApiClient(SSRAxios).getCollection({ collectionId }),
  });

  return (
    <div className="grid md:grid-cols-4 grid-cols-1">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <aside className="col-span-1 mr-10">
          <CollectionsSideNav collectionId={collectionId} />
        </aside>
        <div className="col-span-3">{children}</div>
      </HydrationBoundary>
    </div>
  );
};

export default Page;
