import { useBaseMutation, UseBaseMutationCallbacksType } from "../base";
import { ServerError, CoreClient } from "@edu-platform/common/api";

type Request = Parameters<CoreClient["createNewActivity"]>[0];
type Return = Awaited<ReturnType<CoreClient["createNewActivity"]>>;

export const useCreateNewActivityMutation = (
  args: UseBaseMutationCallbacksType<Request, Return>
) =>
  useBaseMutation<Request, Return>({
    mutationFn: (client, args) =>
      client.createNewActivity({ collectionId: args.collectionId }),
    invalidateQueries: ["activities"],
    ...args,
  });

//export const createNewActivity = () =>
