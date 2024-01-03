import {
  GhostInput,
  GhostTextArea,
  ErrorCard,
  Icons,
  ButtonWithDropdown,
} from "@components";
import { TextContent, VideoContent, ImageContent } from ".";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  useSaveContentMutation,
  useDeleteActivityContentMutation,
} from "@infrastructure";
import { twMerge } from "tailwind-merge";

type BaseContentProps = {
  title?: string;
  description?: string;
  type: string;
  id: string;
  activityId: string;
  versionId: string;
  videoUrl?: string;
  tracks?: string;
  imageUrl?: string;
  text?: string;
  setSaveState: Dispatch<SetStateAction<string>>;
};
export const BaseContent = ({
  title,
  description,
  videoUrl,
  imageUrl,
  text,
  tracks,
  type,
  id: contentId,
  setSaveState,
  activityId,
  versionId,
}: BaseContentProps) => {
  const [hasChanges, setHasChanges] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const saveContentMutation = useSaveContentMutation({
    activityId,
    versionId,
  });
  const deleteContentMutation = useDeleteActivityContentMutation({
    activityId,
    versionId,
    contentId,
  });

  const onSaveTitle = (e) => {
    if (hasChanges) {
      saveContentMutation.mutate({
        title: e.target.value,
        type,
        contentId,
      });
    }
    setHasChanges(false);
  };

  const onSaveDescription = (e) => {
    if (hasChanges) {
      saveContentMutation.mutate({
        description: e.target.value,
        type,
        contentId,
      });
    }
    setHasChanges(false);
  };

  // sets global save state based on this content save state
  useEffect(() => {
    if (saveContentMutation.isPending) setSaveState("isLoading");
    else if (hasChanges) setSaveState("hasChanges");
    else setSaveState("ready");
  }, [saveContentMutation.isPending, hasChanges]);

  const getContent = (type: string) => {
    switch (type) {
      case "Text":
        return (
          <TextContent
            contentId={contentId}
            text={text}
            saveContentMutation={saveContentMutation}
            onChange={setHasChanges}
            hasChanges={hasChanges}
          />
        );
      case "Video":
        return (
          <VideoContent
            saveContentMutation={saveContentMutation}
            contentId={contentId}
            url={videoUrl}
            tracks={tracks}
            onChange={setHasChanges}
            hasChanges={hasChanges}
          />
        );
      case "Image":
        return (
          <ImageContent
            saveContentMutation={saveContentMutation}
            contentId={contentId}
            url={imageUrl}
            title={title}
            description={description}
          />
        );
    }
  };

  return (
    <div
      className={twMerge(
        "grid sm:grid-cols-10 grid-cols-16p-2",
        isFocused ? "bg-surface3" : ""
      )}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
    >
      <div className="lg:col-start-3 lg:col-span-6 sm:col-start-2 sm:col-span-8 col-start-2 col-span-14">
        <GhostInput
          name="title"
          placeholder="Título (opcional)"
          className="text-xl leading-10 font-bold"
          defaultValue={title}
          onBlur={onSaveTitle}
          error={saveContentMutation.error?.errors?.["title"]}
          onChange={() => setHasChanges(true)}
        />
        <GhostTextArea
          name="description"
          placeholder="Descrição (opcional)"
          className="text-text2"
          defaultValue={description}
          onBlur={onSaveDescription}
          error={saveContentMutation.error?.errors?.["description"]}
          onChange={() => setHasChanges(true)}
        />
        {getContent(type)}
      </div>
      <div className="p-1 lg:col-start-10 col-start-16 col-span-1 flex flex-row justify-center items-start">
        <ButtonWithDropdown>
          <ButtonWithDropdown.Text className="">
            <Icons.THREE_DOTS className="hover:shadow-lg p-2" size={36} />
          </ButtonWithDropdown.Text>
          <ButtonWithDropdown.DrawerItem
            className="flex items-center"
            onClick={deleteContentMutation.mutate}
          >
            <Icons.TRASH className="cursor-pointer mx-3" size={16} /> Remover
          </ButtonWithDropdown.DrawerItem>
        </ButtonWithDropdown>
      </div>
    </div>
  );
};
