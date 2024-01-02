import { errorToast, SavingIndicator } from "@components";
import { useGetActivityVersionQuery } from "@infrastructure";

export const ActivityHeader = ({ activityId, versionId, saveState }) => {
  const versionQuery = useGetActivityVersionQuery({ activityId, versionId });

  return (
    <div
      id="activity-header-input"
      className="grid sm:grid-cols-10 grid-cols-16 bg-surface3 p-2"
    >
      <div className="lg:col-start-3 lg:col-span-6 sm:col-start-2 sm:col-span-8 col-start-2 col-span-14">
        <h4 className="text-3xl leading-10 font-bold text-center">
          {versionQuery.data?.title}
        </h4>
        <br />
        <p className="text-xl text-text2 text-center h-auto">
          {versionQuery.data?.description}
        </p>
      </div>
      <div className="lg:col-start-10 col-start-16 col-span-1 flex flex-row justify-end items-start">
        <SavingIndicator
          hasChanges={saveState === "hasChanges"}
          isLoading={saveState === "isLoading"}
        />
      </div>
    </div>
  );
};
