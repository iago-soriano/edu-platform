import { GhostTextArea } from "@components";
import {
  TextContentResponsePayloadDTO,
  ContentTypes,
} from "@edu-platform/common/api";
import { CommmonContentProps } from "./types";

export const TextContent = ({
  payload: { text },
  activityId,
  saveContentMutation,
  contentId,
  hasChanges,
  onChange,
}: { payload: TextContentResponsePayloadDTO } & CommmonContentProps) => {
  const onSaveContent = (e) => {
    if (hasChanges) {
      saveContentMutation.mutate({
        payload: {
          text: {
            text: e.target.value,
          },
        },
        type: ContentTypes.Text,
        id: contentId,
        activityId,
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
