import { ApiClient } from "@edu-platform/common";
import { useBaseMutation, UseBaseMutationCallbacksType } from "./base";

type Request = Parameters<ApiClient["createNewActivity"]>[0];
type Return = Awaited<ReturnType<ApiClient["createNewActivity"]>>;

export const useCreateNewActivityMutation = (
  args: UseBaseMutationCallbacksType<Request, Return>
) =>
  useBaseMutation<Request, Return>({
    mutationFn: (client, args) =>
      client.createNewActivity({ collectionId: args.collectionId }),
    invalidateQueries: ["versions"],
    ...args,
  });
