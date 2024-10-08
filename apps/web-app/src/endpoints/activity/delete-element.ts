import { useBaseMutation, UseBaseMutationCallbacksType } from "../base";
import { ServerError, CoreClient } from "@edu-platform/common/api";

type Params = Parameters<CoreClient["deleteElement"]>[0];
type Return = Awaited<ReturnType<CoreClient["deleteElement"]>>;

export const useDeleteElementMutation = (
  args: UseBaseMutationCallbacksType<Params, Return>
) =>
  useBaseMutation<Params, Return>({
    mutationFn: (client, args) => client.deleteElement(args),
    invalidateQueries: ["versions/draft"],
    ...args,
  });
