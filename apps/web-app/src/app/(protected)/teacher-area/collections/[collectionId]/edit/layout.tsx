"use client";
import {
  ActivityListingOwnership,
  GhostInput,
  GhostTextArea,
  SavingIndicator,
  Tooltip,
  Toggle,
  Spinner,
} from "@components";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { StudentListing } from "./students/student-listing";
import { twMerge } from "tailwind-merge";

const linkClasses =
  "inline-flex items-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground px-4 py-4 justify-start";
const Page = ({ params: { collectionId: strId }, children }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const collectionId = Number(strId);

  const getLinkClasses = (href: string) =>
    twMerge(
      linkClasses,
      pathName.split("/").pop() === href
        ? "bg-muted hover:bg-muted"
        : "hover:bg-transparent hover:underline"
    );
  return (
    <div className="grid md:grid-cols-4 grid-cols-1">
      <aside className="col-span-1 mx-2">
        <nav className="flex flex-col justify-start">
          <Link className={getLinkClasses("settings")} href="settings">
            Settings
          </Link>
          <Link className={getLinkClasses("activities")} href="activities">
            Activities
          </Link>
          <Link className={getLinkClasses("students")} href="students">
            Students
          </Link>
        </nav>
      </aside>
      <div className="col-span-3">{children}</div>
    </div>
    //   <div
    //     id="activity-header-input"
    //     className="grid sm:grid-cols-10 grid-cols-16 bg-surface3 p-2 grid-rows-2"
    //   >
    //     <div className="lg:col-start-3 lg:col-span-6 sm:col-start-2 sm:col-span-8 col-start-1 col-span-15">
    //       <GhostInput
    //         name="name"
    //         placeholder="Nome da coleção"
    //         className="text-3xl leading-10 font-bold"
    //         defaultValue={collectionQuery.data?.name}
    //         disabled={!collectionQuery.data}
    //         onBlur={onChangeName}
    //         error={collectionQuery.error?.errors?.name}
    //         onChange={() => setHasChanges(true)}
    //       />
    //       <GhostTextArea
    //         name="description"
    //         placeholder="Descrição da coleção"
    //         className="text-xl text-text2 h-auto"
    //         defaultValue={collectionQuery.data?.description}
    //         disabled={!collectionQuery.data}
    //         onBlur={onChangeDescription}
    //         error={collectionQuery.error?.errors?.description}
    //         onChange={() => setHasChanges(true)}
    //       />
    //     </div>
    //     <div className="lg:col-start-10 col-start-16 col-span-1 flex flex-col justify-start items-end">
    //       <div className="w-[43px]">
    //         <SavingIndicator
    //           hasChanges={saveState === "hasChanges"}
    //           isLoading={saveState === "isLoading"}
    //         />
    //       </div>
    //     </div>
    //     <div className="lg:col-start-3 lg:col-span-1 sm:col-span-2 sm:col-start-2 col-start-1 col-span-4">
    //       <Tooltip content="As atividades de uma coleção privada só podem ser vistas e respondidas pelos estudantes participantes">
    //         <span className="w-fit inline-block">
    //           <Toggle
    //             label="Coleção privada"
    //             onChange={onChangeIsPrivate}
    //             checked={collectionQuery?.data?.isPrivate || false}
    //           />
    //         </span>
    //       </Tooltip>
    //     </div>

    //     <div className="sm:col-span-2 col-span-4">
    //       <Tooltip content="Ser notificado por e-mail toda vez que um estudante desta coleção completa uma atividade">
    //         <span className="w-fit inline-block">
    //           <Toggle
    //             label="Notificações por e-mail"
    //             onChange={onChangeNotifyOwnerOnStudentOutput}
    //             checked={
    //               collectionQuery?.data?.notifyOwnerOnStudentOutput || false
    //             }
    //           />
    //         </span>
    //       </Tooltip>
    //     </div>
    //   </div>
    //   <div className="flex justify-between p-2 mt-5">
    //     {/* <ToggleText
    //       buttons={[
    //         {
    //           text: "Atividades Ativas",
    //           href: "/collections?ActivityTab=Active",
    //           isSelected: searchParams.get("ActivityTab") === "Active",
    //         },
    //         {
    //           text: "Atividades Arquivadas",
    //           href: "/collections?ActivityTab=Archived",
    //           isSelected: searchParams.get("ActivityTab") === "Archived",
    //         },
    //         {
    //           text: "Poduções dos Estudantes",
    //           href: "/teacher-area/outputs",
    //           isSelected: false, //TODO
    //         },
    //       ]}
    //     /> */}
    //     <button
    //       disabled={createActivityMutation.isPending}
    //       onClick={() => createActivityMutation.mutate({ collectionId })}
    //       className="h-10 w-36 whitespace-nowrap bg-accent p-2 text-white rounded font-bold transition-opacity hover:opacity-80"
    //     >
    //       {createActivityMutation.isPending ||
    //       createActivityMutation.isSuccess ? (
    //         <Spinner />
    //       ) : (
    //         " + Nova atividade"
    //       )}
    //     </button>
    //   </div>
    //   <ActivityListing
    //     collectionId={collectionId}
    //     showActive={searchParams.get("activeTab") !== "ArchivedActivities"}
    //   />

    // </>
  );
};

export default Page;
