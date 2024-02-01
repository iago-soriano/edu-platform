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

type ParamsSave = Parameters<ApiClient["saveContent"]>[0];
type RequestSave = Parameters<ApiClient["saveContent"]>[1];
type ReturnSave = Awaited<ReturnType<ApiClient["saveContent"]>>;

export type SaveContentMutationType = UseMutationResult<
  ReturnSave,
  ServerError,
  RequestSave
>;

export const useSaveContentMutation = ({
  versionId,
  activityId,
  onSuccess,
  onError,
}: MutationArgsType<RequestSave, ReturnSave> & ParamsSave) => {
  const queryClient = useQueryClient();
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useMutation<ReturnSave, ServerError, RequestSave>({
    mutationFn: (args: RequestSave) => {
      return client.saveContent({ activityId, versionId }, args);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["version", activityId, versionId],
      });
      onSuccess && onSuccess();
    },
    onError: onError
      ? (e, v, c) => onError(e, v, c)
      : (e) => errorToast(`Algo deu errado: ${e.message}`),
  });
};

type ParamsDelete = Parameters<ApiClient["deleteContent"]>[0];
type ReturnDelete = Awaited<ReturnType<ApiClient["deleteContent"]>>;

export const useDeleteActivityContentMutation = ({
  activityId,
  versionId,
  contentId,
  onError,
}: MutationArgsType<void, ReturnDelete> & ParamsDelete) => {
  const queryClient = useQueryClient();
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useMutation<ReturnDelete, ServerError>({
    mutationFn: () =>
      client.deleteContent({ activityId, contentId, versionId }),
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
