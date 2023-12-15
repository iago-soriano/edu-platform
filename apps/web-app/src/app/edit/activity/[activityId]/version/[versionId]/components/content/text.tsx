import { GhostTextArea } from "@components";

export const TextContent = ({
  content,
  saveContentMutation,
  onChange,
  hasChanges,
  contentId,
}) => {
  const onSaveContent = (e) => {
    if (hasChanges) {
      saveContentMutation.mutate({
        content: e.target.value,
        type: "Text",
        contentId,
      });
    }
    onChange(false);
  };
  return (
    <GhostTextArea
      name="content"
      placeholder="Conteúdo"
      className="min-h-[200px]"
      defaultValue={content}
      onBlur={onSaveContent}
      error={saveContentMutation.error?.errors?.["content"]}
      onChange={onChange}
    />
  );
};
