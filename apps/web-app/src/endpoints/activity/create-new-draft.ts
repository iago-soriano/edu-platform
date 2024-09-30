import { useBaseMutation, UseBaseMutationCallbacksType } from "../base";
import { ServerError, CoreClient } from "@edu-platform/common/api";

type Params = Parameters<CoreClient["createNewDraftVersion"]>[0];
type Return = Awaited<ReturnType<CoreClient["createNewDraftVersion"]>>;
export const useCreateNewDraftVersionMutation = (
  args: UseBaseMutationCallbacksType<Params, Return>
) =>
  useBaseMutation<Params, Return>({
    mutationFn: (client, args) => client.createNewDraftVersion(args),
    invalidateQueries: ["versions"],
    ...args,
  });
