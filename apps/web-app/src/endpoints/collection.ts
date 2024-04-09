import { ServerError, ApiClient } from "@edu-platform/common";
import { useAxiosAuth } from "@infrastructure";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
  keepPreviousData,
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
    invalidateQueries: ["collection", "collections"],
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
    invalidateQueries: [
      "collection-participations",
      "collection",
      "collections",
    ],
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
    invalidateQueries: [
      "collection-participations",
      "collection",
      "collections",
    ],
    ...args,
  });

export type CollectionListOwnerResponse = Awaited<
  ReturnType<ApiClient["listCollectionsForOwner"]>
>;

export const useListCollectionsForOwnerQuery = ({
  pageSize,
  page,
  isPrivate,
}) => {
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useQuery<CollectionListOwnerResponse, ServerError>({
    queryKey: ["collections", { isPrivate, page, pageSize }],
    // placeholderData: keepPreviousData,
    queryFn: () =>
      client.listCollectionsForOwner({ isPrivate, page, pageSize }),
  });
};

export type CollectionListParticipantResponse = Awaited<
  ReturnType<ApiClient["listCollectionsForOwner"]>
>;

export const useListCollectionsForParticipantQuery = ({
  pageSize,
  page,
  isPrivate,
}) => {
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useQuery<CollectionListParticipantResponse, ServerError>({
    queryKey: ["collections", { isPrivate, page, pageSize }],
    // placeholderData: keepPreviousData,
    queryFn: () =>
      client.listCollectionsForOwner({ isPrivate, page, pageSize }),
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
    queryKey: ["collection", { collectionId }],
    queryFn: () => client.getCollection({ collectionId }),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

type GetStudentsParams = Parameters<ApiClient["listStudentsOfCollection"]>[0];
type ListStudentsResponse = Awaited<
  ReturnType<ApiClient["listStudentsOfCollection"]>
>;

export const useListStudentsOfCollectionQuery = ({
  collectionId,
  pageSize,
  page,
}: GetStudentsParams) => {
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useQuery<ListStudentsResponse, ServerError>({
    queryKey: ["collection-participations", { page, collectionId, pageSize }],
    queryFn: () =>
      client.listStudentsOfCollection({ collectionId, pageSize, page }),
  });
};
