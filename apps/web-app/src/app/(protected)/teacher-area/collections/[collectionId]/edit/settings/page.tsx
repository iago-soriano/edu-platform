import { CollectionSettingsForm } from "./form";
import { getCollectionById } from "@endpoints";

const Page = async ({ params: { collectionId } }) => {
  const data = await getCollectionById(Number(collectionId));

  return (
    <div>
      <CollectionSettingsForm data={data} />
    </div>
  );
};

export default Page;
