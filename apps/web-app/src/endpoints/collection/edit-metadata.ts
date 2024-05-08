import { ServerError, ApiClient } from "@edu-platform/common/api";
import { useBaseMutation, UseBaseMutationCallbacksType } from "../base";
import { queryKeys } from "./query-key-factory";

type Request = Parameters<ApiClient["updateCollectionMetadata"]>[0];
type Return = Awaited<ReturnType<ApiClient["updateCollectionMetadata"]>>;

export const useUpdateCollectionMutation = (
  collectionId: any,
  args: UseBaseMutationCallbacksType<Request, Return>
) =>
  useBaseMutation<Request, Return>({
    mutationFn: (client, args) => client.updateCollectionMetadata(args),
    invalidateQueries: queryKeys.detail(collectionId),
    ...args,
  });
