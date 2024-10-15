import { TrendingActivitiesDataTable } from "@components/TrendingActivitiesDataTable";
import { Client } from "@edu-platform/common/api";
import { Fetcher } from "@infrastructure";

const Page = async ({ searchParams }) => {
  const page = searchParams?.page ?? 0;
  const pageSize = 2;

  const client = new Client(new Fetcher());

  const activities = await client.listGeneratedActivities({
    page,
    pageSize,
  });

  return (
    <TrendingActivitiesDataTable
      data={activities}
      page={page}
      pageSize={pageSize}
    />
  );
};
export default Page;
