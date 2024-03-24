import { CollectionsSideNav } from "./navbar";

const Page = ({ children }) => {
  return (
    <div className="grid md:grid-cols-4 grid-cols-1">
      <aside className="col-span-1 mx-2">
        <CollectionsSideNav />
      </aside>
      <div className="col-span-3">{children}</div>
    </div>
  );
};

export default Page;
