"use client";
import {
  Spinner,
  ArchivedActivityCard,
  DraftActivityCard,
  PublishedActivityCard,
} from "@components";
import { useGetActivitiesQuery } from "@infrastructure";
import { ActivityConstants } from "@edu-platform/common";
import { useRouter } from "next/navigation";

export default function Activities() {
  const router = useRouter();

  const { data } = useGetActivitiesQuery();

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

    return (
      <Component key={version.id} {...version} onClick={onClickActivityCard} />
    );
  };

  return (
    (
      <div className="p-10 [&>*]:my-2 grid grid-cols-10">
        {data?.map((act) => (
          <div className="lg:col-start-3 lg:col-span-6 col-span-10">
            {getActivityVersionCard(act)}
          </div>
        ))}
      </div>
    ) || (
      <div className="p-3">
        <Spinner />
      </div>
    )
  );
}
