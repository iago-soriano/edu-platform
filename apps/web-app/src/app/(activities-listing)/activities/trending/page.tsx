import { TrendingActivitiesDataTable } from "@components/TrendingActivitiesDataTable";
import { Client } from "@edu-platform/common/api";
import { Fetcher } from "@infrastructure";

const Page = async () => {
  const client = new Client(new Fetcher());

  const activities = await client.listGeneratedActivities({
    page: 0,
    pageSize: 10,
  });

  return (
    <TrendingActivitiesDataTable data={activities} page={0} pageSize={10} />
  );
};
export default Page;
