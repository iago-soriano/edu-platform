import { ServerError, ApiClient } from "@edu-platform/common/api";
import { useAxiosAuth } from "@infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useBaseMutation, UseBaseMutationCallbacksType } from "../base";

type Request = Parameters<ApiClient["createNewCollection"]>[0];
type Return = Awaited<ReturnType<ApiClient["createNewCollection"]>>;

export const useCreateNewCollectionMutation = (
  args: UseBaseMutationCallbacksType<Request, Return>
) =>
  useBaseMutation<Request, Return>({
    mutationFn: (client, args) => client.createNewCollection(args),
    invalidateQueries: ["collection", "collections"],
    ...args,
  });
