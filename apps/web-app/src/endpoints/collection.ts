import { ServerError, ApiClient } from "@edu-platform/common";
import { useAxiosAuth } from "@infrastructure";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { MutationArgsType } from "../infrastructure/api/types";
import { errorToast } from "@components";

type RequestSaveCollection = Parameters<ApiClient["saveCollection"]>[0];
type ReturnSaveCollection = Awaited<ReturnType<ApiClient["saveCollection"]>>;

export type SaveCollectionMutationType = UseMutationResult<
  ReturnSaveCollection,
  ServerError,
  Request
>;

export const saveCollectionMutation = (args: RequestSaveCollection) => {
  const queryClient = useQueryClient();
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useMutation<ReturnSaveCollection, ServerError, RequestSaveCollection>({
    mutationFn: () => {
      return client.saveCollection(args);
    },
    onSuccess: (d, v, c) => {
      queryClient.invalidateQueries({
        queryKey: ["collections"],
      });
    },
    onError: (e) => errorToast(`Algo deu errado: ${e.message}`),
  });
};

type ParamsInsertUser = Parameters<ApiClient["insertUserInCollection"]>[0];
type RequestInsertUser = Parameters<ApiClient["insertUserInCollection"]>[1];
type ReturnInsertUser = Awaited<
  ReturnType<ApiClient["insertUserInCollection"]>
>;

export type InsertUserMutationType = UseMutationResult<
  ReturnSaveCollection,
  ServerError,
  Request
>;

export const insertUserInCollectionMutation = (
  params: ParamsInsertUser,
  args: RequestInsertUser
) => {
  const queryClient = useQueryClient();
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useMutation<ReturnInsertUser, ServerError, RequestInsertUser>({
    mutationFn: () => {
      return client.insertUserInCollection(params, args);
    },
    // onSuccess: (d, v, c) => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["collections"],
    //   });
    // },
    onError: (e) => errorToast(`Algo deu errado: ${e.message}`),
  });
};

type ParamsRemoveUser = Parameters<ApiClient["removeUserFromCollection"]>[0];
type ReturnRemoveUser = Awaited<
  ReturnType<ApiClient["removeUserFromCollection"]>
>;

export type RemoveUserMutationType = UseMutationResult<
  ReturnSaveCollection,
  ServerError,
  Request
>;

export const removeUserFromCollectionMutation = (params: ParamsRemoveUser) => {
  const queryClient = useQueryClient();
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useMutation<ReturnRemoveUser, ServerError, ParamsRemoveUser>({
    mutationFn: () => {
      return client.removeUserFromCollection(params);
    },
    // onSuccess: (d, v, c) => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["collections"],
    //   });
    // },
    onError: (e) => errorToast(`Algo deu errado: ${e.message}`),
  });
};
