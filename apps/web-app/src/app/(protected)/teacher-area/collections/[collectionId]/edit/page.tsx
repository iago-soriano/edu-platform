"use client";
import {
  ActivityListing,
  GhostInput,
  GhostTextArea,
  SavingIndicator,
  Tooltip,
  Toggle,
  Spinner,
  ToggleText,
} from "@components";
import { useRouter, useSearchParams } from "next/navigation";
import { InsertStudentModal } from "./insert-student-modal";
import { useState, useEffect } from "react";
import {
  useSaveCollectionMutation,
  useGetCollectionQuery,
  useCreateNewActivityMutation,
} from "@endpoints";
import { StudentListing } from "./student-listing";

const Page = ({ params: { collectionId: strId } }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const collectionId = Number(strId);

  const [hasChanges, setHasChanges] = useState(false);
  const [saveState, setSaveState] = useState("ready");

  const [isInsertStudentModalOpen, setIsInsertStudentModalOpen] =
    useState(false);

  const collectionQuery = useGetCollectionQuery({ collectionId });

  const saveCollectionMutation = useSaveCollectionMutation({
    collectionId,
    onSuccess: (e, v, c) => {
      setHasChanges(false);
    },
  });

  const createActivityMutation = useCreateNewActivityMutation({
    collectionId,
    onSuccess: ({ activityId, versionId }) => {
      console.log({ activityId, versionId });
      router.push(`/activity/${activityId}/version/${versionId}/edit`);
    },
  });

  useEffect(() => {
    if (saveCollectionMutation.isPending) setSaveState("isLoading");
    setSaveState(hasChanges ? "hasChanges" : "ready");
  }, [saveCollectionMutation.isPending, hasChanges]);

  const onChangeName = (args) => {
    if (hasChanges) {
      saveCollectionMutation.mutate({
        id: collectionId,
        name: args.target.value,
      });
    }
    setHasChanges(false);
  };

  const onChangeDescription = (args) => {
    if (hasChanges) {
      saveCollectionMutation.mutate({
        id: collectionId,
        description: args.target.value,
      });
    }
    setHasChanges(false);
  };

  const onChangeIsPrivate = (args) => {
    setHasChanges(true);
    saveCollectionMutation.mutate({
      id: collectionId,
      isPrivate: args,
    });
  };

  const onChangeNotifyOwnerOnStudentOutput = (args) => {
    setHasChanges(true);
    saveCollectionMutation.mutate({
      id: collectionId,
      notifyOwnerOnStudentOutput: args,
    });
  };

  return (
    <>
      <div
        id="activity-header-input"
        className="grid sm:grid-cols-10 grid-cols-16 bg-surface3 p-2 grid-rows-2"
      >
        <div className="lg:col-start-3 lg:col-span-6 sm:col-start-2 sm:col-span-8 col-start-1 col-span-15">
          <GhostInput
            name="name"
            placeholder="Nome da coleção"
            className="text-3xl leading-10 font-bold"
            defaultValue={collectionQuery.data?.name}
            disabled={!collectionQuery.data}
            onBlur={onChangeName}
            error={collectionQuery.error?.errors?.name}
            onChange={() => setHasChanges(true)}
          />
          <GhostTextArea
            name="description"
            placeholder="Descrição da coleção"
            className="text-xl text-text2 h-auto"
            defaultValue={collectionQuery.data?.description}
            disabled={!collectionQuery.data}
            onBlur={onChangeDescription}
            error={collectionQuery.error?.errors?.description}
            onChange={() => setHasChanges(true)}
          />
        </div>
        <div className="lg:col-start-10 col-start-16 col-span-1 flex flex-col justify-start items-end">
          <div className="w-[43px]">
            <SavingIndicator
              hasChanges={saveState === "hasChanges"}
              isLoading={saveState === "isLoading"}
            />
          </div>
        </div>
        <div className="lg:col-start-3 lg:col-span-1 sm:col-span-2 sm:col-start-2 col-start-1 col-span-4">
          <Tooltip content="As atividades de uma coleção privada só podem ser vistas e respondidas pelos estudantes participantes">
            <span className="w-fit inline-block">
              <Toggle
                label="Coleção privada"
                onChange={onChangeIsPrivate}
                checked={collectionQuery?.data?.isPrivate || false}
              />
            </span>
          </Tooltip>
        </div>

        <div className="sm:col-span-2 col-span-4">
          <Tooltip content="Ser notificado por e-mail toda vez que um estudante desta coleção completa uma atividade">
            <span className="w-fit inline-block">
              <Toggle
                label="Notificações por e-mail"
                onChange={onChangeNotifyOwnerOnStudentOutput}
                checked={
                  collectionQuery?.data?.notifyOwnerOnStudentOutput || false
                }
              />
            </span>
          </Tooltip>
        </div>
      </div>
      <div className="flex justify-between p-2 mt-5">
        <ToggleText
          buttons={[
            {
              text: "Atividades Ativas",
              href: "/collections?ActivityTab=Active",
              isSelected: searchParams.get("ActivityTab") === "Active",
            },
            {
              text: "Atividades Arquivadas",
              href: "/collections?ActivityTab=Archived",
              isSelected: searchParams.get("ActivityTab") === "Archived",
            },
            {
              text: "Poduções dos Estudantes",
              href: "/teacher-area/outputs",
              isSelected: false, //TODO
            },
          ]}
        />
        <button
          disabled={createActivityMutation.isPending}
          onClick={() => createActivityMutation.mutate()}
          className="h-10 w-36 whitespace-nowrap bg-accent p-2 text-white rounded font-bold transition-opacity hover:opacity-80"
        >
          {createActivityMutation.isPending ||
          createActivityMutation.isSuccess ? (
            <Spinner />
          ) : (
            " + Nova atividade"
          )}
        </button>
      </div>
      <ActivityListing
        collectionId={collectionId}
        showActive={searchParams.get("activeTab") !== "ArchivedActivities"}
      />
      <div className="flex justify-between p-2 mt-5">
        <h5>Estudantes participantes</h5>
        <button
          onClick={() => setIsInsertStudentModalOpen(true)}
          className="h-10 w-38 whitespace-nowrap bg-accent p-2 text-white rounded font-bold transition-opacity hover:opacity-80"
        >
          + Inserir Estudante
        </button>
      </div>
      <StudentListing collectionId={collectionId} />
      {isInsertStudentModalOpen && (
        <InsertStudentModal
          collectionId={collectionId}
          onClose={() => setIsInsertStudentModalOpen(false)}
        />
      )}
    </>
  );
};

export default Page;
