import { useBaseMutation, UseBaseMutationCallbacksType } from "../base";
import { ServerError, ApiClient } from "@edu-platform/common/api";

type Params = Parameters<ApiClient["createNewDraftVersion"]>[0];
type Return = Awaited<ReturnType<ApiClient["createNewDraftVersion"]>>;
export const useCreateNewDraftVersionMutation = (
  args: UseBaseMutationCallbacksType<Params, Return>
) =>
  useBaseMutation<Params, Return>({
    mutationFn: (client, args) => client.createNewDraftVersion(args),
    invalidateQueries: ["versions"],
    ...args,
  });
