"use client";
import {
  useRouter,
  useSearchParams,
  usePathname,
  redirect,
} from "next/navigation";
import {
  useCreateNewActivityMutation,
  useListCollectionsForOwnerQuery,
  useCreateNewCollectionMutation,
} from "@endpoints";
import {
  Frame,
  LoadingErrorData,
  Icons,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  DataTable,
} from "@components";
import { Router, useParamsState, useLocalStorageState } from "@infrastructure";
import {
  privateCollectionColumns,
  publicCollectionColumns,
} from "./collection-tables";

const pageSize = 10;

// const CollectionsFrame = ({ children }) => (
//   <Frame className="md:w-[80%] w-[95%]">{children}</Frame>
// );
export default function CollectionsLayout({
  currActiveTab,
  pagePublic,
  pagePrivate,
}) {
  const router = useRouter();

  const { params, setParams } = useParamsState({
    pagePrivate: pagePrivate,
    pagePublic: pagePublic,
    activeTab: currActiveTab,
  });

  const privateCollectionsQuery = useListCollectionsForOwnerQuery({
    isPrivate: true,
    page: Number(params.pagePrivate),
    pageSize,
  });

  const publicCollectionsQuery = useListCollectionsForOwnerQuery({
    isPrivate: false,
    page: Number(params.pagePublic),
    pageSize,
  });

  const createCollectionMutation = useCreateNewCollectionMutation({
    onSuccess: (args) => {
      console.log({ args });
      router.push(Router.collectionSettings(args?.CollectionId));
    },
  });

  return (
    // <div className="min-h-[70vh] flex justify-between">
    <Tabs
      value={params?.activeTab}
      onValueChange={(e) => {
        setParams({ ...params, activeTab: e });
      }}
      className="lg:w-[70%] w-full mx-auto"
    >
      <div className="flex justify-between flex-wrap my-8">
        <TabsList>
          <TabsTrigger value={"private"}>Private Collections</TabsTrigger>
          <TabsTrigger value={"public"}>Public Collections</TabsTrigger>
        </TabsList>
        <Button
          withIcon="PLUS"
          variant="action"
          size="lg"
          isLoading={createCollectionMutation.isPending}
          onClick={() => createCollectionMutation.mutate({})}
        >
          New Collection
        </Button>
      </div>
      <TabsContent value={"private"} className="">
        <LoadingErrorData
          loading={privateCollectionsQuery.isPending}
          error={privateCollectionsQuery.error}
          hasData={!!privateCollectionsQuery?.data?.data?.length}
          data={
            <Frame className="w-full">
              <DataTable
                columns={privateCollectionColumns}
                data={privateCollectionsQuery.data?.data || []}
                pagination={{
                  totalRowCount:
                    privateCollectionsQuery.data?.pagination?.totalCount || 0,
                  pageSize,
                  currentPage: Number(params.pagePrivate),
                  setCurrentPage: (e) =>
                    setParams({ ...params, pagePrivate: e }),
                }}
              />
            </Frame>
          }
        />
      </TabsContent>
      <TabsContent value={"public"}>
        <LoadingErrorData
          loading={publicCollectionsQuery.isPending}
          error={publicCollectionsQuery.error}
          hasData={!!publicCollectionsQuery?.data?.data?.length}
          data={
            <Frame>
              <DataTable
                columns={publicCollectionColumns}
                data={publicCollectionsQuery?.data?.data || []}
                pagination={{
                  totalRowCount:
                    publicCollectionsQuery.data?.pagination?.totalCount || 0,
                  pageSize,
                  currentPage: Number(params.pagePublic),
                  setCurrentPage: (e) =>
                    setParams({ ...params, pagePublic: e }),
                }}
              />
            </Frame>
          }
        />
      </TabsContent>
    </Tabs>
    // </div>
  );
}
