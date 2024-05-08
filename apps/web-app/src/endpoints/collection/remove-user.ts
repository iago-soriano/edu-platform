import { ServerError, ApiClient } from "@edu-platform/common/api";
import { useBaseMutation, UseBaseMutationCallbacksType } from "../base";
import { queryKeys } from "./query-key-factory";

type Params = Parameters<ApiClient["removeUserFromCollection"]>[0];
type Return = Awaited<ReturnType<ApiClient["removeUserFromCollection"]>>;

export const useRemoveUserFromCollectionMutation = (
  collectionId: any,
  cbs: UseBaseMutationCallbacksType<Params, Return>
) =>
  useBaseMutation<Params, Return>({
    mutationFn: (client, args) => client.removeUserFromCollection(args),
    invalidateQueries: queryKeys.participants(collectionId),
    ...cbs,
  });
