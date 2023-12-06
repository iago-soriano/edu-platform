import {
  GhostInput,
  GhostTextArea,
  errorToast,
  SavingIndicator,
} from "@components";
import { useState } from "react";
import {
  useGetActivityVersionQuery,
  useUpdateVersionMetadataMutation,
} from "@infrastructure";

export const EditActivityHeader = ({ activityId, versionId }) => {
  const versionQuery = useGetActivityVersionQuery({ activityId, versionId });
  const [hasChanges, setHasChanges] = useState(false);

  const metadataMutation = useUpdateVersionMetadataMutation({
    activityId,
    versionId,
    onError: () => {
      errorToast("Houve um erro ao salvar :(");
    },
  });

  const onChangeTitle = (args) => {
    if (hasChanges) {
      metadataMutation.mutate({ title: args.target.value, activityId });
    }
    setHasChanges(false);
  };

  const onChangeDescription = (args) => {
    if (hasChanges) {
      metadataMutation.mutate({ description: args.target.value, activityId });
    }
    setHasChanges(false);
  };

  return (
    <div className="grid sm:grid-cols-10 grid-cols-16 bg-surface3 p-2">
      <div className="lg:col-start-3 lg:col-span-5 sm:col-start-2 sm:col-span-8 col-start-2 col-span-14">
        <GhostInput
          name="title"
          placeholder="Título da atividade"
          className="text-3xl leading-10 font-bold"
          defaultValue={versionQuery.data?.title}
          disabled={!versionQuery.data}
          onBlur={onChangeTitle}
          error={metadataMutation.error?.message}
          onChange={() => setHasChanges(true)}
        />
        <br />
        <GhostTextArea
          name="description"
          placeholder="Descrição da atividade"
          className="text-xl text-text2"
          defaultValue={versionQuery.data?.description}
          disabled={!versionQuery.data}
          onBlur={onChangeDescription}
          error={metadataMutation.error?.message}
          onChange={() => setHasChanges(true)}
        />
      </div>
      <div className="lg:col-start-10 col-start-16 col-span-1 flex flex-row justify-end items-start">
        <SavingIndicator
          hasChanges={hasChanges}
          isLoading={metadataMutation.isPending}
        />
      </div>
    </div>
  );
};
