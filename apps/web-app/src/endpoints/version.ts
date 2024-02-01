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
type ReturnGet = Awaited<ReturnType<ApiClient["getActivityVersion"]>>;

export type GetActivityVersionQueryType = UseQueryResult<
  ReturnGet,
  ServerError
>;

export const useGetActivityVersionQuery = ({
  activityId,
  versionId,
}: ParamsGet) => {
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useQuery<ReturnGet, ServerError>({
    queryKey: ["version", activityId, versionId],
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
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      queryClient.invalidateQueries({
        queryKey: ["version", activityId, versionId],
      });
    },
    onError: onError
      ? (e, v, c) => onError(e, v, c)
      : (e) => errorToast(`Algo deu errado: ${e.message}`),
    onSettled,
  });
};

type ReturnList = Awaited<ReturnType<ApiClient["listActivityVersions"]>>;

export const useListActivityVersionsQuery = (status) => {
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useQuery<ReturnList, ServerError>({
    queryKey: [status],
    queryFn: () => client.listActivityVersions({ statuses: status }),
  });
};

type ParamsUpdateStatus = Parameters<ApiClient["updateVersionStatus"]>[0];
type RequestUpdateStatus = Parameters<ApiClient["updateVersionStatus"]>[1];
type ReturnUpdateStatus = Awaited<ReturnType<ApiClient["updateVersionStatus"]>>;

export const useUpdateVersionStatusMutation = ({
  activityId,
  versionId,
  onError,
}: MutationArgsType<RequestUpdateStatus, ReturnUpdateStatus> &
  ParamsUpdateStatus) => {
  const queryClient = useQueryClient();
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useMutation<ReturnUpdateStatus, ServerError, RequestUpdateStatus>({
    mutationFn: (args: RequestUpdateStatus) =>
      client.updateVersionStatus({ activityId, versionId }, args),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["version", activityId, versionId],
      });
    },
    onError: onError
      ? (e, v, c) => onError(e, v, c)
      : (e) => errorToast(`Algo deu errado: ${e.message}`),
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
      onSuccess && onSuccess(e, v, c);
      queryClient.invalidateQueries({
        queryKey: ["Draft"],
      });
    },
    onError: onError
      ? (e, v, c) => onError(e, v, c)
      : (e) => errorToast(`Algo deu errado: ${e.message}`),
  });
};
