import {
  GhostInput,
  GhostTextArea,
  SavingIndicator,
  Tooltip,
  Icons,
} from "@components";
import { ConfirmDeleteModal, OptionsMenu } from ".";
import { useState, useEffect } from "react";
import {
  useGetActivityVersionQuery,
  useUpdateVersionMetadataMutation,
  useDeleteDraftVersionMutation,
} from "@infrastructure";

export const ActivityHeaderInput = ({
  activityId,
  versionId,
  saveState,
  setSaveState,
}) => {
  const versionQuery = useGetActivityVersionQuery({ activityId, versionId });
  const [openOptionsMenu, setOpenOptionsMenu] = useState(false);

  const [hasChanges, setHasChanges] = useState(false);
  const metadataMutation = useUpdateVersionMetadataMutation({
    activityId,
    versionId,
  });

  useEffect(() => {
    if (metadataMutation.isPending) setSaveState("isLoading");
    else setSaveState("ready");
  }, [metadataMutation.isPending]);

  const onChange = (hasChange) => {
    setHasChanges(hasChange);
    setSaveState(hasChange ? "hasChanges" : "ready");
  };

  const onChangeTitle = (args) => {
    if (hasChanges) {
      metadataMutation.mutate({ title: args.target.value, activityId });
    }
    onChange(false);
  };

  const onChangeDescription = (args) => {
    if (hasChanges) {
      metadataMutation.mutate({ description: args.target.value, activityId });
    }
    onChange(false);
  };

  return (
    <div
      id="activity-header-input"
      className="grid sm:grid-cols-10 grid-cols-16 bg-surface3 p-2"
    >
      <div className="lg:col-start-3 lg:col-span-6 sm:col-start-2 sm:col-span-8 col-start-2 col-span-14">
        <GhostInput
          name="title"
          placeholder="Título da atividade"
          className="text-3xl leading-10 font-bold text-center"
          defaultValue={versionQuery.data?.title}
          disabled={!versionQuery.data}
          onBlur={onChangeTitle}
          error={metadataMutation.error?.errors?.title}
          onChange={() => onChange(true)}
        />
        <br />
        <GhostTextArea
          name="description"
          placeholder="Descrição da atividade"
          className="text-xl text-text2 text-center h-auto"
          defaultValue={versionQuery.data?.description}
          disabled={!versionQuery.data}
          onBlur={onChangeDescription}
          error={metadataMutation.error?.errors?.description}
          onChange={() => onChange(true)}
        />
      </div>
      <div className="lg:col-start-10 col-start-16 col-span-1 flex flex-col justify-start items-end">
        <div className="w-[40px]">
          <SavingIndicator
            hasChanges={saveState === "hasChanges"}
            isLoading={saveState === "isLoading"}
          />
          <Icons.LIST
            onClick={() => setOpenOptionsMenu(true)}
            className="cursor-pointer mx-3 text-text2 text-opacity-50 p-1"
            size={33}
          />
        </div>
      </div>
      {openOptionsMenu && (
        <OptionsMenu
          onClose={() => setOpenOptionsMenu(false)}
          activityId={activityId}
          versionId={versionId}
          version={versionQuery}
        />
      )}
    </div>
  );
};
