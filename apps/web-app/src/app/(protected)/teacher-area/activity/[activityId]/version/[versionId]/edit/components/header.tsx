import {
  Input,
  GhostInput,
  GhostTextArea,
  SavingIndicator,
  Tooltip,
  Icons,
  errorToast,
  Tag,
} from "@components";
import { DomainRules } from "@edu-platform/common";
import { useState, useEffect } from "react";
import {
  useGetActivityVersionQuery,
  useUpdateVersionMetadataMutation,
} from "@endpoints";
import { openInNewTab } from "@infrastructure";

export const ActivityHeaderInput = ({
  activityId,
  versionId,
  saveState,
  setSaveState,
  onOpenOptionsMenu,
}) => {
  const versionQuery = useGetActivityVersionQuery({ activityId, versionId });
  const [currentTopic, setCurrentTopic] = useState("");

  const [hasChanges, setHasChanges] = useState(false);
  const metadataMutation = useUpdateVersionMetadataMutation({});

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
      metadataMutation.mutate({
        activityId,
        versionId,
        ...versionQuery.data,
        title: args.target.value,
      });
    }
    onChange(false);
  };

  const onInsertTopic = () => {
    if (
      versionQuery.data?.topics?.split(",").length ===
      DomainRules.ACTIVITY.TOPICS.MAX_COUNT
    ) {
      errorToast(
        `Não é permitido mais de ${DomainRules.ACTIVITY.TOPICS.MAX_COUNT} tópicos`
      );
      return;
    }

    const newTopics = versionQuery.data?.topics?.length
      ? `${versionQuery.data?.topics},${currentTopic}`
      : currentTopic;

    metadataMutation.mutate({
      ...versionQuery.data,
      topics: newTopics,
      activityId,
      versionId,
    });
    onChange(false);
    setCurrentTopic("");
  };

  const onDeleteTopic = (index) => {
    const newTopics = versionQuery.data?.topics
      ?.split(",")
      .filter((_, i) => i !== index)
      .join(",");
    metadataMutation.mutate({
      ...versionQuery.data,
      topics: newTopics,
      activityId,
      versionId,
    });
  };

  const onChangeDescription = (args) => {
    if (hasChanges) {
      metadataMutation.mutate({
        activityId,
        versionId,
        ...versionQuery.data,
        description: args.target.value,
      });
    }
    onChange(false);
  };

  return (
    <>
      <p className="flex flex-start p-2 border-2 border-surface3 w-fit">
        Esta atividade pertence à coleção
        <span className="mx-1 font-bold">
          {versionQuery.data?.collection?.name}
        </span>
      </p>
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
          <div className="flex items-center justify-center">
            {versionQuery.data?.topics?.length !== 0 &&
              versionQuery.data?.topics
                ?.split(",")
                .map((topic, index) => (
                  <Tag
                    key={index}
                    text={topic}
                    onClickDelete={() => onDeleteTopic(index)}
                  />
                ))}
            <div className="w-[160px] flex">
              <input
                name="topic"
                placeholder="Novo tópico"
                disabled={!versionQuery.data}
                className="p-2 rounded w-full bg-surface1 placeholder:opacity-80 placeholder:text-text2"
                onChange={(e) => {
                  setCurrentTopic((e.target as any).value);
                  onChange(true);
                }}
                onKeyDown={(e) => {
                  if (e.key.includes("Enter")) onInsertTopic();
                }}
                value={currentTopic}
              />
              <button
                onClick={onInsertTopic}
                className="text-error rounded border border-text1 p-3 hover:bg-surface3 hover:opacity-50 hover:border-black hover:shadow-hover hover:font-bold"
              >
                <Icons.CHECK />
              </button>
            </div>
          </div>
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
          <div className="w-[43px]">
            <Icons.LIST
              onClick={onOpenOptionsMenu}
              className="cursor-pointer mx-3 text-accent text-opacity p-1"
              size={33}
            />
            <SavingIndicator
              hasChanges={saveState === "hasChanges"}
              isLoading={saveState === "isLoading"}
            />
            <Tooltip content="Pré-visualizar atividade. Abre uma nova aba">
              <span>
                <Icons.CAN_SEE
                  onClick={() =>
                    openInNewTab(
                      `/activity/${activityId}/version/${versionId}/preview`
                    )
                  }
                  className="cursor-pointer mx-3 text-text2 text-opacity-50 p-1"
                  size={33}
                />
              </span>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
};
