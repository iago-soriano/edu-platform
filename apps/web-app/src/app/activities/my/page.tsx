import { Client } from "@edu-platform/common/api";
import { MyActivitiesDataTable } from "./_data-table";
import { CreateNewActivityDialog } from "@components/CreateNewActivityDialog";
import { Fetcher } from "@infrastructure";

const Page = async () => {
  const client = new Client(new Fetcher());

  const activities = await client.listMyActivities({
    page: 0,
    pageSize: 10,
  });

  return (
    <div className="sm:w-[90%] lg:w-[50%] mx-auto">
      <div className="w-full flex justify-end items-center mb-2">
        <CreateNewActivityDialog />
      </div>

      <MyActivitiesDataTable data={activities} page={0} pageSize={10} />
    </div>
  );
};
export default Page;
