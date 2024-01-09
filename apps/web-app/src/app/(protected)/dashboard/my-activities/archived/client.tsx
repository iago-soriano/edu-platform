"use client";
import { ArchivedActivityCard } from "../../components";
import { LoadingErrorData } from "@components";
import { useGetActivityVersionsQuery } from "@infrastructure";
import { useRouter } from "next/navigation";

export default function Activities() {
  const router = useRouter();
  const query = useGetActivityVersionsQuery("Archived");

  return (
    <LoadingErrorData
      loading={query.isPending}
      error={query.error}
      hasData={!!query.data?.length}
      data={
        <div className="p-10 [&>*]:my-2 grid grid-cols-10">
          {query.data?.map((version) => (
            <div
              key={version.id}
              className="lg:col-start-3 lg:col-span-6 col-span-10"
            >
              <ArchivedActivityCard
                {...version}
                onClick={() =>
                  router.push(
                    `/activity/${version.activityId}/version/${version.id}/view`
                  )
                }
              />
            </div>
          ))}
        </div>
      }
    />
  );
}
