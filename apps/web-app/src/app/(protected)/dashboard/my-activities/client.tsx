"use client";
import {
  Spinner,
  ArchivedActivityCard,
  DraftActivityCard,
  PublishedActivityCard,
  ErrorCard,
} from "@components";
import { useGetActivityVersionsQuery } from "@infrastructure";
import { ActivityConstants } from "@edu-platform/common";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function Activities() {
  const router = useRouter();
  const query = useGetActivityVersionsQuery();
  const client = useQueryClient();

  const getActivityVersionCard = (version) => {
    const onClickActivityCard = () => {
      router.push(`/edit/activity/${version.activityId}/version/${version.id}`);
    };

    let Component = PublishedActivityCard;
    switch (version.status) {
      case ActivityConstants.STATUS.DRAFT:
        Component = DraftActivityCard;
        break;
      case ActivityConstants.STATUS.ARCHIVED:
        Component = ArchivedActivityCard;
        break;
    }

    return <Component {...version} onClick={onClickActivityCard} />;
  };

  if (query.error) {
    let errorMessage = "Houve um erro de conexão com a internet";
    if (query.error.message !== "Network Error") {
      console.log("query error", query.error);
      errorMessage = "Houve um erro desconhecido";
    }

    return (
      <div className="p-3 flex justify-center">
        <ErrorCard message={errorMessage} />
      </div>
    );
  }

  return query.isPending ? (
    <div className="h-[150px] my-10">
      <Spinner />
    </div>
  ) : (
    <div className="p-10 [&>*]:my-2 grid grid-cols-10">
      <button
        onClick={() => {
          client.invalidateQueries({ queryKey: ["activities"] });
        }}
      >
        Invalidate
      </button>
      {query.data?.map((act) => (
        <div key={act.id} className="lg:col-start-3 lg:col-span-6 col-span-10">
          {getActivityVersionCard(act)}
        </div>
      ))}
    </div>
  );
}
