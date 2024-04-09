import {
  GhostInput,
  GhostTextArea,
  ErrorCard,
  Icons,
  ContentContainer,
} from "@components";
import { ButtonWithDropdown } from "components/atoms/buttons/with-dropdown";
import { TextContent, VideoContent, ImageContent } from ".";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useSaveContentMutation, useDeleteContentMutation } from "@endpoints";
import { ContentResponseDTO } from "@edu-platform/common";
import { twMerge } from "tailwind-merge";

type BaseContentProps = {
  contentDto: ContentResponseDTO;
  activityId: string;
  setSaveState: Dispatch<SetStateAction<string>>;
};
export const BaseContent = ({
  contentDto,
  setSaveState,
  activityId,
}: BaseContentProps) => {
  const [hasChanges, setHasChanges] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const saveContentMutation = useSaveContentMutation({});
  const deleteContentMutation = useDeleteContentMutation({});

  const onSaveDescription = (e) => {
    if (hasChanges) {
      saveContentMutation.mutate({
        activityId,
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
      onChange: setHasChanges,
      hasChanges,
      saveContentMutation,
    };

    switch (type) {
      case "Text":
        return (
          <TextContent
            {...commonProps}
            payload={contentDto.payload?.text || { text: "" }}
          />
        );
      case "Video":
        return (
          <VideoContent
            {...commonProps}
            payload={contentDto.payload.video || { tracks: "", url: "" }}
          />
        );
      case "Image":
        return (
          <ImageContent
            {...commonProps}
            payload={contentDto.payload.image || { url: "" }}
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
      <ContentContainer>
        {/* <GhostInput
          name="title"
          placeholder="Título (opcional)"
          className="text-xl leading-10 font-bold"
          defaultValue={contentDto.title}
          onBlur={onSaveTitle}
          error={saveContentMutation.error?.errors?.["title"]}
          onChange={() => setHasChanges(true)}
        /> */}
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
            <Icons.THREE_DOTS_VERTICAL
              className="hover:shadow-lg p-2"
              size={36}
            />
          </ButtonWithDropdown.Text>
          <ButtonWithDropdown.DrawerItem
            className="flex items-center"
            onClick={() =>
              deleteContentMutation.mutate({
                elementId: contentDto.id,
                activityId,
              })
            }
          >
            <Icons.TRASH className="cursor-pointer mx-3" size={16} /> Remover
          </ButtonWithDropdown.DrawerItem>
        </ButtonWithDropdown>
      </div>
    </div>
  );
};
