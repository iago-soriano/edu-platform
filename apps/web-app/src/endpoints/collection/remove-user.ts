import { ServerError, ApiClient } from "@edu-platform/common/api";
import { useAxiosAuth } from "@infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useBaseMutation, UseBaseMutationCallbacksType } from "../base";

type Params = Parameters<ApiClient["removeUserFromCollection"]>[0];
type Return = Awaited<ReturnType<ApiClient["removeUserFromCollection"]>>;

export const useRemoveUserFromCollectionMutation = (
  args: UseBaseMutationCallbacksType<Params, Return>
) =>
  useBaseMutation<Params, Return>({
    mutationFn: (client, args) => client.removeUserFromCollection(args),
    invalidateQueries: [
      "collection-participations",
      "collection",
      "collections",
    ],
    ...args,
  });
