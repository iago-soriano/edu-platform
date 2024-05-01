import { useBaseMutation, UseBaseMutationCallbacksType } from "../base";
import { ServerError, ApiClient } from "@edu-platform/common/api";

type Params = Parameters<ApiClient["deleteElement"]>[0];
type Return = Awaited<ReturnType<ApiClient["deleteElement"]>>;

export const useDeleteElementMutation = (
  args: UseBaseMutationCallbacksType<Params, Return>
) =>
  useBaseMutation<Params, Return>({
    mutationFn: (client, args) => client.deleteElement(args),
    invalidateQueries: ["versions/draft"],
    ...args,
  });
