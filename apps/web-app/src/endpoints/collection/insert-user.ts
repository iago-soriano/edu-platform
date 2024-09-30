import { ServerError, CoreClient } from "@edu-platform/common/api";
import { useBaseMutation, UseBaseMutationCallbacksType } from "../base";
import { queryKeys } from "./query-key-factory";

type Params = Parameters<CoreClient["insertUserInCollection"]>[0];
type Return = Awaited<ReturnType<CoreClient["insertUserInCollection"]>>;

export const useInsertUserInCollectionMutation = (
  collectionId: any,
  args: UseBaseMutationCallbacksType<Params, Return>
) =>
  useBaseMutation<Params, Return>({
    mutationFn: (client, args) => client.insertUserInCollection(args),
    invalidateQueries: queryKeys.participants(collectionId),
    ...args,
  });
