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
import { errorToast, successToast } from "@components";
import {
  useBaseMutation,
  // useBaseQuery,
  UseBaseMutationCallbacksType,
} from "./base";

type RequestSaveCollection = Parameters<ApiClient["saveCollection"]>[0];
type ReturnSaveCollection = Awaited<ReturnType<ApiClient["saveCollection"]>>;

export const useSaveCollectionMutation = (
  args: UseBaseMutationCallbacksType<
    RequestSaveCollection,
    ReturnSaveCollection
  >
) =>
  useBaseMutation<RequestSaveCollection, ReturnSaveCollection>({
    mutationFn: (client, args) => client.saveCollection(args),
    invalidateQueries: ["collection"],
    ...args,
  });

type ParamsInsertUser = Parameters<ApiClient["insertUserInCollection"]>[0];
type ReturnInsertUser = Awaited<
  ReturnType<ApiClient["insertUserInCollection"]>
>;

export const useInsertUserInCollectionMutation = (
  args: UseBaseMutationCallbacksType<ParamsInsertUser, ReturnInsertUser>
) =>
  useBaseMutation<ParamsInsertUser, ReturnInsertUser>({
    mutationFn: (client, args) => client.insertUserInCollection(args),
    invalidateQueries: ["collection-participations"],
    ...args,
  });

type ParamsRemoveUser = Parameters<ApiClient["removeUserFromCollection"]>[0];
type ReturnRemoveUser = Awaited<
  ReturnType<ApiClient["removeUserFromCollection"]>
>;

export const useRemoveUserFromCollectionMutation = (
  args: UseBaseMutationCallbacksType<ParamsRemoveUser, ReturnRemoveUser>
) =>
  useBaseMutation<ParamsRemoveUser, ReturnRemoveUser>({
    mutationFn: (client, args) => client.removeUserFromCollection(args),
    invalidateQueries: ["collection-participations"],
    ...args,
  });

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
    queryKey: ["collection"],
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
    queryKey: [`collection-participations`],
    queryFn: () => client.getStudentsOfCollection({ collectionId }),
  });
};
