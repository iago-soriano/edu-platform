import { LinkButton } from "@components/ui/LinkButton";
import { CreateNewActivityDialog } from "@components/CreateNewActivityDialog";
import { LayoutDashboardIcon } from "lucide-react";

const Layout = async ({ children }) => {
  return (
    <div className="sm:w-[90%] mx-auto mt-8">
      <div className="w-full flex justify-end items-center mb-2 p-4 gap-4">
        {/* <LinkButton href={"/activities/my"} variant="secondary">
          MY ACTIVITIES
        </LinkButton> */}
        <CreateNewActivityDialog />
      </div>

      {children}
    </div>
  );
};
export default Layout;
