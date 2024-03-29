"use client";
import {
  useRouter,
  useSearchParams,
  usePathname,
  redirect,
} from "next/navigation";
import {
  useCreateNewActivityMutation,
  useListCollectionsQuery,
  useSaveCollectionMutation,
} from "@endpoints";
import {
  Spinner,
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

  const privateCollectionsQuery = useListCollectionsQuery({
    byOwnership: true,
    isPrivate: true,
    page: Number(params.pagePrivate),
    pageSize,
  });

  const publicCollectionsQuery = useListCollectionsQuery({
    byOwnership: true,
    isPrivate: false,
    page: Number(params.pagePublic),
    pageSize,
  });

  const createCollectionMutation = useSaveCollectionMutation({
    onSuccess: (args) => {
      if (args) router.push(Router.editCollection(args.collectionId));
    },
  });

  return (
    <div className="min-h-[70vh] flex justify-between p-4 w-[95%] mx-auto">
      <Tabs
        value={params?.activeTab}
        onValueChange={(e) => {
          setParams({ ...params, activeTab: e });
        }}
        className="w-full"
      >
        <div className="w-full flex justify-between">
          <TabsList>
            <TabsTrigger value={"private"}>Private Collections</TabsTrigger>
            <TabsTrigger value={"public"}>Public Collections</TabsTrigger>
          </TabsList>
          <Button
            withIcon="PLUS"
            variant="action"
            size="lg"
            isLoading={createCollectionMutation.isPending}
          >
            New Collection
          </Button>
        </div>
        <TabsContent value={"private"}>
          <LoadingErrorData
            loading={privateCollectionsQuery.isPending}
            error={privateCollectionsQuery.error}
            hasData={
              !!privateCollectionsQuery?.data?.isOwnerOf?.collections?.length
            }
            data={
              <Frame>
                <DataTable
                  columns={privateCollectionColumns}
                  data={
                    privateCollectionsQuery.data?.isOwnerOf?.collections || []
                  }
                  pagination={{
                    totalRowCount:
                      privateCollectionsQuery.data?.isOwnerOf?.pagination
                        ?.totalRowCount || 0,
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
            hasData={
              !!publicCollectionsQuery?.data?.isOwnerOf?.collections?.length
            }
            data={
              <Frame>
                <DataTable
                  columns={publicCollectionColumns}
                  data={
                    publicCollectionsQuery.data?.isOwnerOf?.collections || []
                  }
                  pagination={{
                    totalRowCount:
                      publicCollectionsQuery.data?.isOwnerOf?.pagination
                        ?.totalRowCount || 0,
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
    </div>
  );
}
