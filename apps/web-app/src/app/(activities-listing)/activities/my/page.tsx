import { Client } from "@edu-platform/common/api";
import { MyActivitiesDataTable } from "@components/MyActivitiesDataTable";
import { Fetcher } from "@infrastructure";

const Page = async () => {
  const client = new Client(new Fetcher());

  const activities = await client.listMyActivities({
    page: 0,
    pageSize: 10,
  });
  return <MyActivitiesDataTable data={activities} page={0} pageSize={10} />;
};
export default Page;
