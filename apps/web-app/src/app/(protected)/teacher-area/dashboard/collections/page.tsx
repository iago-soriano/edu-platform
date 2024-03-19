"use client";
import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  useCreateNewActivityMutation,
  useListCollectionsQuery,
  useSaveCollectionMutation,
} from "@endpoints";
import { Spinner, Frame, LoadingErrorData, Icons, Button } from "@components";
import { Router } from "@infrastructure";
import { ConfirmCollectionModal } from "./confirm-collection-modal";
import { CollectionsTable } from "./collections-table";

const pageSize = 1;

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const page = Number(searchParams.get("page")) || 0;

  const [openConfirmCollectionModal, setOpenConfirmCollectionModal] =
    useState(false);
  const collectionsQuery = useListCollectionsQuery({ page, pageSize });
  const [isLoading, setIsLoading] = useState(false);

  const createCollectionMutation = useSaveCollectionMutation({
    onSuccess: ({ collectionId }) => {
      router.push(Router.editCollection(collectionId));
    },
  });

  return (
    <div className="min-h-[70vh]">
      <div>
        <LoadingErrorData
          loading={collectionsQuery.isPending && !collectionsQuery?.data}
          error={collectionsQuery.error}
          hasData={!!collectionsQuery?.data}
          noData={<h6 className="text-center">Não há coleções para exibir</h6>}
          data={
            <div>
              <div className="flex justify-between p-4 w-[95%] mx-auto">
                <div className="flex items-center">
                  <span className="text-xl p-2">My Collections</span>
                  <Icons.DOT />
                  <span className="text-sm text-muted-foreground p-2">
                    {collectionsQuery.data?.isOwnerOf?.collections?.filter(
                      (coll) => coll.isPrivate
                    ).length || "0"}{" "}
                    private collections
                  </span>
                  <Icons.DOT />
                  <span className="text-sm text-muted-foreground p-2">
                    {collectionsQuery.data?.isOwnerOf?.collections?.filter(
                      (coll) => !coll.isPrivate
                    ).length || "0"}{" "}
                    public collections
                  </span>
                </div>
                <button onClick={() => setIsLoading((l) => !l)}>Loading</button>
                <Button
                  withIcon="PLUS"
                  variant="action"
                  size="lg"
                  isLoading={createCollectionMutation.isPending || isLoading}

                  // onClick={() =>
                  //   createCollectionMutation.mutate({
                  //     name: "My new Collection",
                  //   })
                  // }
                >
                  New Collection
                </Button>
              </div>
              <Frame>
                <CollectionsTable
                  collections={collectionsQuery.data?.isOwnerOf?.collections}
                  pagination={{
                    totalRowCount:
                      collectionsQuery.data?.isOwnerOf?.pagination
                        ?.totalRowCount || 0,
                    pageSize,
                    currentPage: page,
                    setCurrentPage: (p) => {
                      const params = new URLSearchParams(
                        searchParams.toString()
                      );
                      params.set("page", p.toString());
                      router.replace(pathName + "?" + params.toString());
                    },
                  }}
                />
              </Frame>
            </div>
          }
        />

        <div className="lg:col-span-1 md:col-span-2 col-span-1">
          <button
            onClick={() => setOpenConfirmCollectionModal(true)}
            className="h-10 w-36 whitespace-nowrap bg-accent p-2 text-white rounded font-bold transition-opacity hover:opacity-80"
          >
            + Nova atividade
          </button>
        </div>
      </div>
      {openConfirmCollectionModal && (
        <ConfirmCollectionModal
          collectionsQuery={collectionsQuery}
          onClose={() => setOpenConfirmCollectionModal(false)}
          collectionId={Number(searchParams.get("selectedCollectionId"))}
        />
      )}
    </div>
  );
};

export default Page;
