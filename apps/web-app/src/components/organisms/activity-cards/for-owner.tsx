import {
  DraftVersionActivityCard,
  ArchivedGroupActivityCard,
  PublishedVersionActivityCard,
} from "@components";
import {
  ListActivitiesForOwnerResponse,
  useCreateNewDraftVersionMutation,
} from "@endpoints";
import { Router } from "@infrastructure";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function ActivityCardOwnership({
  activityVersion,
  //router,
}: {
  activityVersion: ListActivitiesForOwnerResponse["data"][number];
  //router: AppRouterInstance;
}) {
  //const createNewDraftMutation = useCreateNewDraftVersionMutation({});

  console.log(activityVersion);
  if (activityVersion.published) {
    return (
      <PublishedVersionActivityCard
        key={activityVersion.activityId}
        version={activityVersion.published}
        hasDraft={!!activityVersion.draft}
        archivedCount={activityVersion.archivedVersionsCount}
        collection={activityVersion.collectionName}
        href={Router.previewActivityDraft({
          activityId: activityVersion.activityId,
        })}
      />
    );
  }
  if (activityVersion.draft) {
    return (
      <DraftVersionActivityCard
        key={activityVersion.activityId}
        collection={activityVersion.collectionName}
        version={activityVersion.draft}
        /* onClick={() =>
          router.push(
            Router.editActivity({
              activityId: activityVersion.activityId,
            })
          )
        } */
      />
    );
  }

  /*  return (
    <ArchivedGroupActivityCard
      key={activityVersion.activityId}
      currentTitle={"Não há versão publicada"}
      archivedCount={activityVersion.archivedVersionsCount}
    />
  ); */
}
