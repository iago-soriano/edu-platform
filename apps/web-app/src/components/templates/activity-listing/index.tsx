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

export function ActivityListing({ collectionId, showActive }) {
  const router = useRouter();

  const query = useListActivityVersionsQuery({
    // collectionId,
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
    if (!queryData) return [];

    const content = [];

    if (!showActive) {
      for (const collId in queryData) {
        const { activities, collection } = queryData[collId];

        content.push(
          activities
            .filter((act) => act.Archived?.length)
            .map((act) => ({
              versions: act.Archived,
              activityId: act.activityId,
              currentTitle: act.Published?.title,
            }))
            .map(({ versions, activityId, currentTitle }) => (
              <ArchivedGroupActivityCard
                key={activityId}
                currentTitle={currentTitle || "Não há versão publicada"}
                versions={versions}
              />
            ))
        );
      }
    } else if (showActive) {
      for (const collId in queryData) {
        if (collectionId && collId != collectionId) continue;

        const { activities, collection } = queryData[collId];
        activities.map(({ activityId, Published, Draft, Archived }) => {
          if (Published)
            content.push(
              <PublishedVersionActivityCard
                key={activityId}
                version={Published}
                hasDraft={!!Draft}
                archivedCount={Archived?.length}
                collection={collection.name}
                onClick={() => {
                  router.push(
                    Router.previewActivity({
                      activityId: activityId,
                      versionId: Published.id,
                    })
                  );
                }}
                onClickSeeDraft={() =>
                  router.push(
                    Router.editActivity({
                      activityId: activityId,
                      versionId: Draft.id,
                    })
                  )
                }
                onClickCreateDraft={() =>
                  newDraftMutation.mutate({
                    activityId: activityId.toString(),
                  })
                }
              />
            );
          else if (!Published && Draft) {
            content.push(
              <DraftVersionActivityCard
                key={activityId}
                collection={collectionId ? "" : collection.name}
                version={Draft}
                onClick={() =>
                  router.push(
                    Router.editActivity({
                      activityId: activityId,
                      versionId: Draft.id,
                    })
                  )
                }
              />
            );
          }
        });
      }
    }

    return content;
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
