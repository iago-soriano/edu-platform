import { ServerError, ApiClient } from "@edu-platform/common";
import { useAxiosAuth } from "@infrastructure";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { MutationArgsType } from "../infrastructure/api/types";
import { errorToast } from "@components";
import {
  useBaseMutation,
  // useBaseQuery,
  UseBaseMutationCallbacksType,
} from "./base";

type ParamsGet = Parameters<ApiClient["getActivityVersion"]>[0];
export type ReturnGetActivityVersion = Awaited<
  ReturnType<ApiClient["getActivityVersion"]>
>;

export const useGetActivityVersionQuery = ({
  activityId,
  versionId,
}: ParamsGet) => {
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useQuery<ReturnGetActivityVersion, ServerError>({
    queryKey: [`version`],
    queryFn: () => client.getActivityVersion({ activityId, versionId }),
  });
};

type ParamsUpdateMetadata = Parameters<ApiClient["updateVersionMetadata"]>[0];
type ReturnUpdateMetadata = Awaited<
  ReturnType<ApiClient["updateVersionMetadata"]>
>;

export const useUpdateVersionMetadataMutation = (
  args: UseBaseMutationCallbacksType<ParamsUpdateMetadata, ReturnUpdateMetadata>
) =>
  useBaseMutation<ParamsUpdateMetadata, ReturnUpdateMetadata>({
    mutationFn: (client, args) => client.updateVersionMetadata(args),
    invalidateQueries: ["version"],
    ...args,
  });

type ListQueryParams = Parameters<ApiClient["listActivityVersions"]>[0];
type ReturnList = Awaited<ReturnType<ApiClient["listActivityVersions"]>>;
export type ListQueryReturn = UseQueryResult<ReturnList, ServerError>;

export const useListActivityVersionsQuery = ({
  byOwnership,
  collectionId,
}: ListQueryParams) => {
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useQuery<ReturnList, ServerError>({
    queryKey: ["versions"],
    queryFn: () => client.listActivityVersions({ byOwnership, collectionId }),
  });
};

type ParamsUpdateStatus = Parameters<ApiClient["updateVersionStatus"]>[0];
type ReturnUpdateStatus = Awaited<ReturnType<ApiClient["updateVersionStatus"]>>;

export const useUpdateVersionStatusMutation = (
  args: UseBaseMutationCallbacksType<ParamsUpdateStatus, ReturnUpdateStatus>
) =>
  useBaseMutation<ParamsUpdateStatus, ReturnUpdateStatus>({
    mutationFn: (client, args) => client.updateVersionStatus(args),
    invalidateQueries: ["versions"],
    ...args,
  });

type ParamsDelete = Parameters<ApiClient["deleteVersion"]>[0];
type ReturnDelete = Awaited<ReturnType<ApiClient["deleteVersion"]>>;

export const useDeleteDraftVersionMutation = (
  args: UseBaseMutationCallbacksType<ParamsDelete, ReturnDelete>
) =>
  useBaseMutation<ParamsDelete, ReturnDelete>({
    mutationFn: (client, args) => client.deleteVersion(args),
    invalidateQueries: ["versions"],
    ...args,
  });

type ParamsCreateNewDraft = Parameters<ApiClient["createNewDraftVersion"]>[0];
type ReturnCreateNewDraft = Awaited<
  ReturnType<ApiClient["createNewDraftVersion"]>
>;
export const useCreateNewDraftVersionMutation = (
  args: UseBaseMutationCallbacksType<ParamsCreateNewDraft, ReturnCreateNewDraft>
) =>
  useBaseMutation<ParamsCreateNewDraft, ReturnCreateNewDraft>({
    mutationFn: (client, args) => client.createNewDraftVersion(args),
    invalidateQueries: ["versions"],
    ...args,
  });
