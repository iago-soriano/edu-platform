import { GhostTextArea } from "@components";
import { TextContentPayloadDTO, ContentTypes } from "@edu-platform/common";
import { CommmonContentProps } from "./types";

export const TextContent = ({
  payload: { text },
  saveContentMutation,
  contentId,
  hasChanges,
  onChange,
}: { payload: TextContentPayloadDTO } & CommmonContentProps) => {
  const onSaveContent = (e) => {
    if (hasChanges) {
      console.log();
      saveContentMutation.mutate({
        payload: {
          text: {
            text: e.target.value,
          },
        },
        type: ContentTypes.Text,
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
      error={saveContentMutation.error?.errors?.["text"]}
      onChange={() => onChange(true)}
    />
  );
};
