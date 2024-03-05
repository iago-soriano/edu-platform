import { ApiClient } from "@edu-platform/common";
import { useBaseMutation, UseBaseMutationCallbacksType } from "./base";

type ParamsSave = Parameters<ApiClient["saveContent"]>[0];
type ReturnSave = Awaited<ReturnType<ApiClient["saveContent"]>>;

export const useSaveContentMutation = (
  args: UseBaseMutationCallbacksType<ParamsSave, ReturnSave>
) =>
  useBaseMutation<ParamsSave, ReturnSave>({
    mutationFn: (client, args) => {
      console.log({ args });
      return client.saveContent(args);
    },
    invalidateQueries: ["version"],
    ...args,
  });

type ParamsDelete = Parameters<ApiClient["deleteContent"]>[0];
type ReturnDelete = Awaited<ReturnType<ApiClient["deleteContent"]>>;

export const useDeleteContentMutation = (
  args: UseBaseMutationCallbacksType<ParamsDelete, ReturnDelete>
) =>
  useBaseMutation<ParamsDelete, ReturnDelete>({
    mutationFn: (client, args) => client.deleteContent(args),
    invalidateQueries: ["versions"],
    ...args,
  });
