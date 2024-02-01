import { GhostTextArea } from "@components";
import { TextContentPayloadDTO, ContentTypes } from "@edu-platform/common";
import { CommmonContentProps } from "./types";

export const TextContent = ({
  payload: { text },
  saveContentMutation,
  contentId,
  hasChanges,
  onChange,
  title,
  description,
}: { payload: TextContentPayloadDTO } & CommmonContentProps) => {
  const onSaveContent = (e) => {
    if (hasChanges) {
      saveContentMutation.mutate({
        payload: {
          text: {
            text: e.target.value,
          },
        },
        type: ContentTypes.Video,
        id: contentId,
      });
    }
    onChange(false);
  };
  return (
    <GhostTextArea
      name="content"
      placeholder="Conteúdo"
      className="min-h-[200px]"
      defaultValue={text}
      onBlur={onSaveContent}
      error={saveContentMutation.error?.errors?.["content"]}
      // onChange={onChange}
    />
  );
};
