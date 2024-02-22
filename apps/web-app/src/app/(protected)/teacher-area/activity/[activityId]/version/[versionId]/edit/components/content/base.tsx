import {
  GhostInput,
  GhostTextArea,
  ErrorCard,
  Icons,
  ButtonWithDropdown,
  ContentContainer,
} from "@components";
import { TextContent, VideoContent, ImageContent } from ".";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  useSaveContentMutation,
  useDeleteActivityContentMutation,
} from "@endpoints";
import { ContentResponseDTO } from "@edu-platform/common";
import { twMerge } from "tailwind-merge";

type BaseContentProps = {
  contentDto: ContentResponseDTO;
  activityId: string;
  versionId: string;
  setSaveState: Dispatch<SetStateAction<string>>;
};
export const BaseContent = ({
  contentDto,
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
    contentId: contentDto.id.toString(),
  });

  const onSaveTitle = (e) => {
    if (hasChanges) {
      saveContentMutation.mutate({
        title: e.target.value,
        type: contentDto.type,
        id: contentDto.id,
      });
    }
    setHasChanges(false);
  };

  const onSaveDescription = (e) => {
    if (hasChanges) {
      saveContentMutation.mutate({
        description: e.target.value,
        type: contentDto.type,
        id: contentDto.id,
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
    const commonProps = {
      contentId: contentDto.id,
      order: contentDto.order,
      onChange: setHasChanges,
      hasChanges,
      saveContentMutation,
    };

    switch (type) {
      case "Text":
        return (
          <TextContent {...commonProps} payload={contentDto.payload.text} />
        );
      case "Video":
        return (
          <VideoContent {...commonProps} payload={contentDto.payload.video} />
        );
      case "Image":
        return (
          <ImageContent {...commonProps} payload={contentDto.payload.image} />
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
      <ContentContainer>
        <GhostInput
          name="title"
          placeholder="Título (opcional)"
          className="text-xl leading-10 font-bold"
          defaultValue={contentDto.title}
          onBlur={onSaveTitle}
          error={saveContentMutation.error?.errors?.["title"]}
          onChange={() => setHasChanges(true)}
        />
        <GhostTextArea
          name="description"
          placeholder="Descrição (opcional)"
          className="text-text2"
          defaultValue={contentDto.description}
          onBlur={onSaveDescription}
          error={saveContentMutation.error?.errors?.["description"]}
          onChange={() => setHasChanges(true)}
        />
        {getContent(contentDto.type)}
      </ContentContainer>
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
