import { ServerError, CoreClient } from "@edu-platform/common/api";
import { useBaseMutation, UseBaseMutationCallbacksType } from "../base";
import { queryKeys } from "./query-key-factory";

type Params = Parameters<CoreClient["removeUserFromCollection"]>[0];
type Return = Awaited<ReturnType<CoreClient["removeUserFromCollection"]>>;

export const useRemoveUserFromCollectionMutation = (
  collectionId: any,
  cbs?: UseBaseMutationCallbacksType<Params, Return>
) =>
  useBaseMutation<Params, Return>({
    mutationFn: (client, args) => client.removeUserFromCollection(args),
    invalidateQueries: queryKeys.participants(collectionId),
    ...cbs,
  });
