import { Button } from "@components/ui/Button";
import { TrendingActivitiesDataTable } from "./_data-table";
import { LinkButton } from "@components/ui/LinkButton";
import { CreateNewActivityDialog } from "@components/CreateNewActivityDialog";
import { Client } from "@edu-platform/common/api";
import { Fetcher } from "@infrastructure";
import { ActivityDialog } from "@components/ActivityDialog";

const Page = async () => {
  const client = new Client(new Fetcher());

  const activities = await client.listGeneratedActivities({
    page: 0,
    pageSize: 10,
  });

  return (
    <div className="sm:w-[90%] lg:w-[50%] mx-auto">
      <div className="w-full flex justify-between items-center mb-2">
        <LinkButton href={"/activities/my"} variant="ghost">
          MY ACTIVITIES
        </LinkButton>
        <CreateNewActivityDialog />
      </div>

      <TrendingActivitiesDataTable data={activities} page={0} pageSize={10} />
      <ActivityDialog />
    </div>
  );
};
export default Page;
