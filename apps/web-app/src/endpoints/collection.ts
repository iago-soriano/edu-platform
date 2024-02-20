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

export const useSaveCollectionMutation = ({
  collectionId,
  onSuccess,
}: { collectionId?: number } & MutationArgsType<
  RequestSaveCollection,
  ReturnSaveCollection
>) => {
  const queryClient = useQueryClient();
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useMutation<ReturnSaveCollection, ServerError, RequestSaveCollection>({
    mutationFn: (args: RequestSaveCollection) => {
      return client.saveCollection(args);
    },
    onSuccess: (d, v, c) => {
      queryClient.invalidateQueries({
        queryKey: [`collection-${collectionId}`],
      });
      onSuccess && onSuccess(d, v, c);
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

export const useInsertUserInCollectionMutation = (
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

export const useRemoveUserFromCollectionMutation = (
  params: ParamsRemoveUser
) => {
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

type CollectionListResponse = Awaited<ReturnType<ApiClient["listCollections"]>>;

export const useListCollectionsQuery = () => {
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useQuery<CollectionListResponse, ServerError>({
    queryKey: ["collections"],
    queryFn: () => client.listCollections(),
  });
};

type GetCollectionParams = Parameters<ApiClient["getCollection"]>[0];
type GetCollectionResponse = Awaited<ReturnType<ApiClient["getCollection"]>>;

export const useGetCollectionQuery = ({
  collectionId,
}: GetCollectionParams) => {
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useQuery<GetCollectionResponse, ServerError>({
    queryKey: [`collection-${collectionId}`],
    queryFn: () => client.getCollection({ collectionId }),
  });
};

type GetStudentsParams = Parameters<ApiClient["getStudentsOfCollection"]>[0];
type GetStudentsResponse = Awaited<
  ReturnType<ApiClient["getStudentsOfCollection"]>
>;

export const useGetStudentsOfCollectionQuery = ({
  collectionId,
}: GetStudentsParams) => {
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useQuery<GetStudentsResponse, ServerError>({
    queryKey: ["collection-students", collectionId],
    queryFn: () => client.getStudentsOfCollection({ collectionId }),
  });
};
