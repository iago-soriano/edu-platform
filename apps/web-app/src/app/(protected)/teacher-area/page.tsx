"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCreateNewActivityMutation,
  useListCollectionsQuery,
  useSaveCollectionMutation,
} from "@endpoints";
import {
  Spinner,
  Tabs,
  ToggleText,
  ActivityListing,
  LoadingErrorData,
} from "@components";
import { CollectionOwnsCard } from "./collection-listing";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCollectionId, setSelectedCollectionId] = useState<number>();

  const collectionsQuery = useListCollectionsQuery();
  const createActivityMutation = useCreateNewActivityMutation({
    collectionId: selectedCollectionId,
    onSuccess: ({ activityId, versionId }) => {
      router.push(`/activity/${activityId}/version/${versionId}/edit`);
    },
  });
  const createCollectionMutation = useSaveCollectionMutation({
    onSuccess: ({ collectionId }) => {
      console.log(collectionId);
      router.push(
        `/teacher-area/collections/${collectionId}/edit?ActivityTab=Active`
      );
    },
  });

  return (
    <div className="min-h-[70vh]">
      <div>
        <div className="flex justify-between p-4 w-[95%] mx-auto">
          <div>
            <h5>Minhas Coleções</h5>
            <p>Insira atividades nestas coleções</p>
          </div>
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
        <LoadingErrorData
          loading={collectionsQuery.isPending}
          error={collectionsQuery.error}
          hasData={!!collectionsQuery?.data}
          noData={<h6 className="text-center">Não há coleções para exibir</h6>}
          data={
            <div className="grid lg:w-[90%] mx-auto md:w-[80%] w-[90%] lg:grid-cols-5 md:gid-cols-3csm:grid-cols-2 grid-cols-1 auto-rows-max items-center justify-items-center lg:[&>*]:w-[80%]">
              {collectionsQuery?.data?.isOwnerOf?.map((coll) => (
                <CollectionOwnsCard
                  collection={coll}
                  onClick={() => {
                    router.push(
                      `/teacher-area/collections/${coll.id}/edit?ActivityTab=Active`
                    );
                  }}
                />
              ))}
            </div>
          }
        />
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 items-center justify-items-end w-[95%] mx-auto">
        <ToggleText
          className="lg:col-span-4 col-span-2"
          buttons={[
            {
              text: "Atividades Ativas",
              href: "/teacher-area?activeTab=ActiveActivities",
              isSelected: searchParams.get("activeTab") === "ActiveActivities",
            },
            {
              text: "Atividades Arquivadas",
              href: "/teacher-area?activeTab=ArchivedActivities",
              isSelected:
                searchParams.get("activeTab") === "ArchivedActivities",
            },
            {
              text: "Poduções dos Estudantes",
              href: "/teacher-area?activeTab=StudentOutputs",
              isSelected: searchParams.get("activeTab") === "StudentOutputs",
            },
          ]}
        />
        <div className="lg:col-span-1 md:col-span-2 col-span-1">
          <select
            className="p-3 m-1 rounded bg-surface1"
            onChange={(e) => {
              setSelectedCollectionId(Number(e.target.value));
            }}
            placeholder="Selecionar coleção"
          >
            <option key={0}>Todas</option>
            {collectionsQuery?.data?.isOwnerOf?.map((coll) => (
              <option key={coll.id} value={coll.id}>
                {coll.name}
              </option>
            ))}
          </select>
          <button
            disabled={createActivityMutation.isPending}
            onClick={() => createActivityMutation.mutate()}
            className="h-10 w-36 whitespace-nowrap bg-accent p-2 text-white rounded font-bold transition-opacity hover:opacity-80"
          >
            {createActivityMutation.isPending ||
            createActivityMutation.isSuccess ? (
              <Spinner />
            ) : (
              " + Nova atividade"
            )}
          </button>
        </div>
      </div>
      <ActivityListing
        collectionId={selectedCollectionId}
        showActive={searchParams.get("activeTab") !== "ArchivedActivities"}
      />
    </div>
  );
};

export default Page;
