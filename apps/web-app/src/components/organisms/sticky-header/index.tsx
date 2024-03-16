import { twMerge } from "tailwind-merge";
import { SavingIndicator, Icons, Tag } from "@components";
import { ReturnGetActivityVersion } from "@endpoints";

export const StickyHeader = ({
  show,
  activity,
  saveState,
  onOpenOptionsMenu,
}: {
  show: boolean;
  activity: ReturnGetActivityVersion;
  saveState: any;
  onOpenOptionsMenu: () => any;
}) => {
  return (
    <div
      className={twMerge(
        "bg-surface3 p-2 grid xl:grid-cols-16 lg:grid-cols-10 grid-cols-5 sticky top-0 transition-all max-h-12",
        show ? "opacity-100" : "opacity-0"
      )}
    >
      <span className="lg:col-span-2 col-span-1 mx-1 font-bold overflow-ellipsis h-fit">
        {activity?.collection?.name}
      </span>
      <h5 className="col-span-2 overflow-hidden">{activity?.title}</h5>
      <div className="lg:col-span-2 col-span-1 mx-2 sm:flex hidden items-center">
        {activity?.topics
          ?.split(",")
          .map((topic, index) => <Tag key={index} text={topic} />)}
      </div>
      <div className="flex xl:col-start-16 lg:col-start-10 col-start-5 col-span-1 justify-self-end">
        <SavingIndicator
          hasChanges={saveState === "hasChanges"}
          isLoading={saveState === "isLoading"}
        />
        <Icons.LIST
          onClick={onOpenOptionsMenu}
          className="cursor-pointer mx-3 p-1 text-accent"
          size={33}
        />
      </div>
    </div>
  );
};