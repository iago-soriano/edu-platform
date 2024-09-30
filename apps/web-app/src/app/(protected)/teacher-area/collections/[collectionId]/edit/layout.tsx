import { SideNav } from "@components";
import { getCollectionById } from "@endpoints";

const Page = async function CollectionsLayout({ children, params }) {
  const collection = await getCollectionById(Number(params.collectionId));

  const tabs = [
    { title: "Settings", href: "settings" },
    { title: "Activities", href: "activities", icon: <span>{}</span> }, // TODO: get total os student participants in get by id collection query and display here
  ];

  if (collection?.isPrivate) tabs.push({ title: "Students", href: "students" });

  return (
    <div className="grid md:grid-cols-4 grid-cols-1">
      <aside className="col-span-1 mr-10">
        <h5>{collection?.name}</h5>
        <SideNav tabs={tabs} />
      </aside>
      <div className="col-span-3">{children}</div>
    </div>
  );
};

export default Page;
