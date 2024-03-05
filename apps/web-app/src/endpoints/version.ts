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
    queryKey: [`version-${versionId}`],
    queryFn: () => client.getActivityVersion({ activityId, versionId }),
  });
};

type ParamsUpdateMetadata = Parameters<ApiClient["updateVersionMetadata"]>[0];
type RequestUpdateMetadata = Parameters<ApiClient["updateVersionMetadata"]>[1];
type ReturnUpdateMetadata = Awaited<
  ReturnType<ApiClient["updateVersionMetadata"]>
>;

export const useUpdateVersionMetadataMutation = ({
  onError,
  onSuccess,
  onSettled,
  versionId,
  activityId,
}: MutationArgsType<RequestUpdateMetadata, ReturnUpdateMetadata> &
  ParamsUpdateMetadata) => {
  const queryClient = useQueryClient();
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useMutation<ReturnUpdateMetadata, ServerError, RequestUpdateMetadata>({
    mutationFn: (args: RequestUpdateMetadata) =>
      client.updateVersionMetadata({ activityId, versionId }, args),
    onSuccess: (d, v, c) => {
      onSuccess && onSuccess(d, v, c);
      queryClient.invalidateQueries({
        queryKey: [`version-${versionId}`],
      });
      queryClient.invalidateQueries({
        queryKey: ["versions"],
      });
    },
    onError: onError
      ? (e, v, c) => onError(e, v, c)
      : (e) => errorToast(`Algo deu errado: ${e.message}`),
    onSettled,
  });
};

type ReturnList = Awaited<ReturnType<ApiClient["listActivityVersions"]>>;
export type ListQueryReturn = UseQueryResult<ReturnList, ServerError>;

export const useListActivityVersionsQuery = ({ byOwnership }) => {
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useQuery<ReturnList, ServerError>({
    queryKey: ["versions"],
    queryFn: () => client.listActivityVersions({ byOwnership }),
  });
};

type ParamsUpdateStatus = Parameters<ApiClient["updateVersionStatus"]>[0];
type RequestUpdateStatus = Parameters<ApiClient["updateVersionStatus"]>[1];
type ReturnUpdateStatus = Awaited<ReturnType<ApiClient["updateVersionStatus"]>>;

export const useUpdateVersionStatusMutation = ({
  activityId,
  versionId,
  onError,
  onSuccess,
}: MutationArgsType<RequestUpdateStatus, ReturnUpdateStatus> &
  ParamsUpdateStatus) => {
  const queryClient = useQueryClient();
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useMutation<ReturnUpdateStatus, ServerError, RequestUpdateStatus>({
    mutationFn: (args: RequestUpdateStatus) =>
      client.updateVersionStatus({ activityId, versionId }, args),
    onSuccess: (e, v, c) => {
      queryClient.invalidateQueries({
        queryKey: ["versions"],
      });
      onSuccess && onSuccess(e, v, c);
    },
    onError: onError
      ? (e, v, c) => onError(e, v, c)
      : (e) => {
          if (e.message === "NEXT_REDIRECT") return;
          errorToast(`Algo deu errado: ${e.message}`);
        },
  });
};

type ParamsDelete = Parameters<ApiClient["deleteVersion"]>[0];
type ReturnDelete = Awaited<ReturnType<ApiClient["deleteVersion"]>>;

export const useDeleteDraftVersionMutation = ({
  activityId,
  versionId,
  onSuccess,
  onError,
}: MutationArgsType<void, ReturnDelete> & ParamsDelete) => {
  const queryClient = useQueryClient();
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useMutation<void, ServerError>({
    mutationFn: () => client.deleteVersion({ activityId, versionId }),
    onSuccess: (e, v, c) => {
      queryClient.invalidateQueries({
        queryKey: [`versions`],
      });
      onSuccess && onSuccess(e, v, c);
    },
    onError: onError
      ? (e, v, c) => onError(e, v, c)
      : async (e) => {
          if (e.message === "NEXT_REDIRECT") return;
          errorToast(`Algo deu errado: ${e.message}`);
        },
  });
};

type ParamsCreateNewDraft = Parameters<ApiClient["createNewDraftVersion"]>[0];
type ReturnCreateNewDraft = Awaited<
  ReturnType<ApiClient["createNewDraftVersion"]>
>;
export const useCreateNewDraftVersionMutation = ({
  onSuccess,
}: MutationArgsType<ParamsCreateNewDraft, ReturnCreateNewDraft>) => {
  const queryClient = useQueryClient();
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useMutation<ReturnCreateNewDraft, ServerError, ParamsCreateNewDraft>({
    mutationFn: ({ activityId }: ParamsCreateNewDraft) =>
      client.createNewDraftVersion({ activityId }),
    onSuccess: (d, v, c) => {
      onSuccess && onSuccess(d, v, c);
      queryClient.invalidateQueries({ queryKey: ["versions"] });
    },
    onError: (e) => errorToast(`Algo deu errado: ${e.message}`),
  });
};
