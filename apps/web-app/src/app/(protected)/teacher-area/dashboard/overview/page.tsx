"use client";
import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  useCreateNewActivityMutation,
  useListCollectionsQuery,
  useSaveCollectionMutation,
} from "@endpoints";
import {
  Spinner,
  Frame,
  LoadingErrorData,
  OverviewCard,
  OverviewCardHeader,
  OverviewCardBody,
} from "@components";
import { Router } from "@infrastructure";
import { ConfirmCollectionModal } from "./confirm-collection-modal";
import { CollectionsTable } from "./collections-table";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const [openConfirmCollectionModal, setOpenConfirmCollectionModal] =
    useState(false);
  const collectionsQuery = useListCollectionsQuery();

  const createCollectionMutation = useSaveCollectionMutation({
    onSuccess: ({ collectionId }) => {
      router.push(Router.editCollection({ collectionId }));
    },
  });

  return (
    <div className="min-h-[70vh]">
      <div>
        <LoadingErrorData
          loading={collectionsQuery.isPending}
          error={collectionsQuery.error}
          hasData={!!collectionsQuery?.data}
          noData={<h6 className="text-center">Não há coleções para exibir</h6>}
          data={
            <div>
              <div className="my-3">
                <OverviewCard>
                  <OverviewCardHeader>
                    {
                      collectionsQuery.data?.isOwnerOf?.pagination
                        ?.totalRowCount
                    }{" "}
                    Collections
                  </OverviewCardHeader>
                  {/* <OverviewCardBody>
                    {
                      collectionsQuery.data?.isOwnerOf?.filter(
                        (coll) => coll.isPrivate
                      ).length
                    }{" "}
                    are private
                  </OverviewCardBody>
                  <OverviewCardBody>
                    {
                      collectionsQuery.data?.isOwnerOf?.filter(
                        (coll) => !coll.isPrivate
                      ).length
                    }{" "}
                    are not private
                  </OverviewCardBody> */}
                </OverviewCard>
              </div>
              <Frame>
                <div className="flex justify-between p-4 w-[95%] mx-auto">
                  <h5>My Collections</h5>
                  <button
                    disabled={createCollectionMutation.isPending}
                    onClick={() =>
                      createCollectionMutation.mutate({ name: "Nova coleção" })
                    }
                    className="h-10 w-36 whitespace-nowrap bg-accent p-2 text-white rounded font-bold transition-opacity hover:opacity-80"
                  >
                    {createCollectionMutation.isPending ||
                    createCollectionMutation.isSuccess ? (
                      <Spinner />
                    ) : (
                      " + Nova coleção"
                    )}
                  </button>
                </div>
                <CollectionsTable
                  collections={collectionsQuery.data?.isOwnerOf?.collections}
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
