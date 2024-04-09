"use client";
import {
  DraftVersionActivityCard,
  ArchivedGroupActivityCard,
  PublishedVersionActivityCard,
} from "@components";
import {
  ListQueryForOwnerReturn,
  useCreateNewDraftVersionMutation,
} from "@endpoints";
import { Router } from "@infrastructure";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function ActivityListingOwnership({
  activityVersions,
  router,
}: {
  activityVersions: ListQueryForOwnerReturn;
  router: AppRouterInstance;
}) {
  const createNewDraftMutation = useCreateNewDraftVersionMutation({});

  return activityVersions.data?.data?.map(
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
                Router.previewActivityDraft({
                  activityId: activityId,
                })
              );
            }}
            onClickSeeDraft={() =>
              router.push(
                Router.editActivity({
                  activityId: activityId,
                })
              )
            }
            onClickCreateDraft={() =>
              createNewDraftMutation.mutate({
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
            collection={collectionName}
            version={draft}
            onClick={() =>
              router.push(
                Router.editActivity({
                  activityId: activityId,
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
}
