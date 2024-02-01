import { errorToast, SavingIndicator } from "@components";
import { useGetActivityVersionQuery } from "@endpoints";

export const ActivityHeader = ({ activityId, versionId, saveState }) => {
  const versionQuery = useGetActivityVersionQuery({ activityId, versionId });

  return (
    <div
      id="activity-header-input"
      className="grid sm:grid-cols-10 grid-cols-16 bg-accent px-2 py-6 bg-opacity-60"
    >
      <div className="lg:col-start-3 lg:col-span-6 sm:col-start-2 sm:col-span-8 col-start-2 col-span-14">
        <h4 className="text-3xl leading-10 font-bold text-center">
          {versionQuery.data?.title}
        </h4>
        <div className="flex items-center justify-center">
          {versionQuery.data?.topics?.length !== 0 &&
            versionQuery.data?.topics?.split(",").map((topic, index) => (
              <div
                key={index}
                className="flex rounded p-1 items-center bg-accent text-white w-fit h-fit  mx-1"
              >
                {topic}
              </div>
            ))}
        </div>

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
