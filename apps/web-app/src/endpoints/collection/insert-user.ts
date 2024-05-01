import { ServerError, ApiClient } from "@edu-platform/common/api";
import { useAxiosAuth } from "@infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useBaseMutation, UseBaseMutationCallbacksType } from "../base";

type Params = Parameters<ApiClient["insertUserInCollection"]>[0];
type Return = Awaited<ReturnType<ApiClient["insertUserInCollection"]>>;

export const useInsertUserInCollectionMutation = (
  args: UseBaseMutationCallbacksType<Params, Return>
) =>
  useBaseMutation<Params, Return>({
    mutationFn: (client, args) => client.insertUserInCollection(args),
    invalidateQueries: [
      "collection-participations",
      "collection",
      "collections",
    ],
    ...args,
  });
