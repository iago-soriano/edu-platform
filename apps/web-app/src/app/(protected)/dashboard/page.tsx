import { Client } from "@edu-platform/common/api";
import { MyActivitiesDataTable } from "@components/MyActivitiesDataTable";
import { Fetcher } from "@infrastructure";
import { CreateNewActivityDialog } from "@components/CreateNewActivityDialog";

const Page = async () => {
  const client = new Client(new Fetcher());

  const activities = await client.listMyActivities({
    page: 0,
    pageSize: 10,
  });
  return (
    <div className="sm:w-[90%] mx-auto mt-8">
      <div className="w-full flex justify-end items-center mb-2 p-4 gap-4">
        <CreateNewActivityDialog />
      </div>

      <MyActivitiesDataTable data={activities} page={0} pageSize={10} />
    </div>
  );
};
export default Page;
