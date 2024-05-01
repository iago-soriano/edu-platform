import { useBaseMutation, UseBaseMutationCallbacksType } from "../base";
import { ServerError, ApiClient } from "@edu-platform/common/api";

type ParamsSaveContent = Parameters<ApiClient["saveContent"]>[0];
type ReturnSaveContent = Awaited<ReturnType<ApiClient["saveContent"]>>;

export const useSaveContentMutation = (
  args: UseBaseMutationCallbacksType<ParamsSaveContent, ReturnSaveContent>
) =>
  useBaseMutation<ParamsSaveContent, ReturnSaveContent>({
    mutationFn: (client, args) => {
      return client.saveContent(args);
    },
    invalidateQueries: ["versions/draft"],
    ...args,
  });
type ParamsSaveImageContent = Parameters<ApiClient["saveContentWithFile"]>[0];
type ReturnSaveImageContent = Awaited<
  ReturnType<ApiClient["saveContentWithFile"]>
>;

export const useSaveImageContentMutation = (
  args: UseBaseMutationCallbacksType<
    ParamsSaveImageContent,
    ReturnSaveImageContent
  >
) =>
  useBaseMutation<ParamsSaveImageContent, ReturnSaveImageContent>({
    mutationFn: (client, args) => {
      return client.saveContentWithFile(args);
    },
    invalidateQueries: ["versions/draft"],
    ...args,
  });
