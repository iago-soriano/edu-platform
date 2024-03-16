"use client";
import {
  DraftVersionActivityCard,
  ArchivedGroupActivityCard,
  PublishedVersionActivityCard,
  LoadingErrorData,
} from "@components";
import {
  useListActivityVersionsQuery,
  useCreateNewDraftVersionMutation,
} from "@endpoints";
import { useRouter } from "next/navigation";
import { Router } from "@infrastructure";

export function ActivityListingOwnership({ collectionId, showActive }) {
  const router = useRouter();

  const query = useListActivityVersionsQuery({
    collectionId,
    byOwnership: true,
  });

  const newDraftMutation = useCreateNewDraftVersionMutation({
    onSuccess: (d, v) => {
      router.push(
        Router.editActivity({
          activityId: v.activityId,
          versionId: d.versionId,
        })
      );
    },
  });

  const renderContent = (queryData: typeof query.data) => {
    // if (!queryData) return [];
    return queryData?.activities?.map(
      ({
        collectionName,
        activityId,
        published,
        draft,
        archivedVersionsCount,
      }) => {
        if (published) {
          return (
            <PublishedVersionActivityCard
              key={activityId}
              version={published}
              hasDraft={!!draft}
              archivedCount={archivedVersionsCount}
              collection={collectionName}
              onClick={() => {
                router.push(
                  Router.previewActivity({
                    activityId: activityId,
                    versionId: published.id,
                  })
                );
              }}
              onClickSeeDraft={() =>
                router.push(
                  Router.editActivity({
                    activityId: activityId,
                    versionId: draft?.id,
                  })
                )
              }
              onClickCreateDraft={() =>
                newDraftMutation.mutate({
                  activityId,
                })
              }
            />
          );
        }
        if (draft) {
          return (
            <DraftVersionActivityCard
              key={activityId}
              collection={collectionId ? "" : collectionName}
              version={draft}
              onClick={() =>
                router.push(
                  Router.editActivity({
                    activityId: activityId,
                    versionId: draft.id,
                  })
                )
              }
            />
          );
        }
        return (
          <ArchivedGroupActivityCard
            key={activityId}
            currentTitle={"Não há versão publicada"}
            archivedCount={archivedVersionsCount}
          />
        );
      }
    );
  };

  return (
    <LoadingErrorData
      loading={query.isPending}
      error={query.error}
      hasData={query?.data && !!Object.keys(query.data).length}
      noData={<h6 className="text-center">Não há atividades para exibir</h6>}
      data={
        <div className="grid lg:w-[90%] mx-auto md:w-[80%] w-[90%] lg:grid-cols-2 grid-cols-1 auto-rows-max items-center justify-items-center lg:[&>*]:w-[80%]">
          {renderContent(query?.data)}
        </div>
      }
    />
  );
}
