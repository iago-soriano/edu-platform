import { CoreClient } from "@edu-platform/common/api";
import { SSRAxios } from "@infrastructure";
import { Frame } from "@components";
import { PublicCollectionsDataTable } from "./_data-table";

const pageSize = 10;

const Page = async ({ searchParams }) => {
  //searchParams opts into dynamic rendering
  const { page } = searchParams;

  const data = await new CoreClient(SSRAxios).listCollectionsForOwner({
    isPrivate: false,
    page,
    pageSize,
  });

  return (
    <Frame className="w-full">
      <PublicCollectionsDataTable data={data} page={page} pageSize={pageSize} />
    </Frame>
  );
};

export default Page;
