"use client";
import {
  DraftVersionActivityCard,
  ArchivedGroupActivityCard,
  PublishedVersionActivityCard,
} from "../components";
import { LoadingErrorData } from "@components";
import {
  useListActivityVersionsQuery,
  useCreateNewDraftVersionMutation,
} from "@endpoints";
import { useRouter, useSearchParams } from "next/navigation";

export default function Activities() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status");

  const query = useListActivityVersionsQuery(currentStatus);
  const newDraftMutation = useCreateNewDraftVersionMutation({
    onSuccess: (d, v) => {
      router.push(`/activity/${v.activityId}/version/${d.versionId}/edit`);
    },
  });

  const renderContent = (queryData: typeof query.data) => {
    if (!queryData) return [];
    const content = [];
    const args: typeof query.data = Object.keys(queryData)
      .sort()
      .reverse()
      .reduce((obj, key) => {
        obj[key] = queryData[key];
        return obj;
      }, {});

    if (currentStatus === "Archived") {
      for (const activityId in args) {
        const versions = args[activityId];
        content.push(
          <ArchivedGroupActivityCard
            key={activityId}
            currentTitle={
              versions?.Published?.title || "Não há versão publicada"
            }
            versions={versions?.Archived}
          />
        );
      }
    } else {
      for (const activityId in args) {
        const versions = args[activityId];
        if (versions.Published)
          content.push(
            <PublishedVersionActivityCard
              key={activityId}
              version={versions?.Published}
              hasDraft={!!versions?.Draft}
              archivedCount={versions?.Archived?.length}
              onClick={() => {}}
              onClickSeeDraft={() =>
                router.push(
                  `/activity/${versions.Draft.activityId}/version/${versions.Draft.id}/edit`
                )
              }
              onClickCreateDraft={() =>
                newDraftMutation.mutate({
                  activityId: activityId.split("-")[1],
                })
              }
            />
          );
        else if (!versions.Published && versions.Draft) {
          const draft = versions.Draft;
          content.push(
            <DraftVersionActivityCard
              key={activityId}
              version={draft}
              onClick={() =>
                router.push(
                  `/activity/${draft.activityId}/version/${draft.id}/edit`
                )
              }
            />
          );
        }
      }
    }

    return content.sort((a, b) => a.key - b.key);
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
