import { CoreClient } from "@edu-platform/common/api";
import { SSRAxios } from "@infrastructure";
import { Frame } from "@components";
import { PrivateCollectionsDataTable } from "./_data-table";

const pageSize = 10;

const Page = async ({ searchParams }) => {
  //searchParams opts into dynamic rendering
  const { page } = searchParams;

  const data = await new CoreClient(SSRAxios).listCollectionsForOwner({
    isPrivate: true,
    page,
    pageSize,
  });

  return (
    <Frame className="w-full">
      <PrivateCollectionsDataTable
        data={data}
        page={page}
        pageSize={pageSize}
      />
    </Frame>
  );
};

export default Page;
