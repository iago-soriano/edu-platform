import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  UpdateActivityVersionMetadataRequestParams,
  UpdateActivityVersionMetadataRequestBody,
  UpdateActivityVersionMetadataResponseBody,
  GetActivityVersionResponseBody,
  CreateNewActivityRequestBody,
  CreateNewActivityResponseBody,
  GetActivityVersionsResponseBody,
  SaveContentRequestBody,
  SaveContentRequestParams,
  SaveContentResponseBody,
  DeleteActivityContentParams,
  UpdateActivityStatusRequestParams,
  UpdateActivityStatusRequestBody,
  UpdateActivityStatusResponseBody,
  DeleteDraftVersionParams,
} from "@edu-platform/common/api";
import { ServerError } from "@edu-platform/common";
import { useAxiosAuth } from "@infrastructure";
import { MutationArgsType, MutationArgsDefaultValue } from "./types";
import { errorToast } from "@components";

const logMutation = ({ isLoading, isError, isIdle, isSuccess, isPaused }) =>
  console.log({ isLoading, isError, isIdle, isSuccess, isPaused });

export const useCreateActivityMutation = (
  args: MutationArgsType<
    CreateNewActivityRequestBody,
    CreateNewActivityResponseBody
  >
) => {
  const queryClient = useQueryClient();
  const axios = useAxiosAuth();

  return useMutation<
    CreateNewActivityResponseBody,
    ServerError,
    CreateNewActivityRequestBody
  >({
    mutationFn: (args: CreateNewActivityRequestBody) =>
      axios.post.bind(axios)("create-new-activity", args),
    onSuccess: ({ activityId, versionId }, v, c) => {
      args.onSuccess({ activityId, versionId }, v, c);
      queryClient.invalidateQueries({ queryKey: ["Draft"] });
    },
    onError: () => errorToast("Algo deu errado :("),
  });
};

export type VersionQueryResultType = UseQueryResult<
  GetActivityVersionResponseBody,
  ServerError
>;
export const useGetActivityVersionQuery = ({ activityId, versionId }) => {
  const axios = useAxiosAuth();

  return useQuery<GetActivityVersionResponseBody, ServerError>({
    queryKey: ["version", activityId, versionId],
    queryFn: () =>
      axios.get.bind(axios)(`activity/${activityId}/version/${versionId}`),
  });
};

export const useUpdateVersionMetadataMutation = (
  {
    onError,
    onSuccess,
    onSettled,
    versionId,
    activityId,
  }: MutationArgsType<
    UpdateActivityVersionMetadataRequestBody,
    UpdateActivityVersionMetadataResponseBody
  > &
    UpdateActivityVersionMetadataRequestParams = {
    ...MutationArgsDefaultValue,
    activityId: "",
    versionId: "",
  }
) => {
  const queryClient = useQueryClient();
  const axios = useAxiosAuth();

  return useMutation<
    UpdateActivityVersionMetadataResponseBody,
    ServerError,
    UpdateActivityVersionMetadataRequestBody
  >({
    mutationFn: (args: UpdateActivityVersionMetadataRequestBody) =>
      axios.post.bind(axios)(
        `activity/${activityId}/update-activity-metadata/${versionId}`,
        args
      ),
    onSuccess: (d, v, c) => {
      onSuccess && onSuccess(d, v, c);
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      queryClient.invalidateQueries({
        queryKey: ["version", activityId, versionId],
      });
    },
    onError: (e) => errorToast(e.message),
    onSettled,
  });
};

export const useGetActivityVersionsQuery = (status) => {
  const axios = useAxiosAuth();

  return useQuery<GetActivityVersionsResponseBody, ServerError>({
    queryKey: [status],
    queryFn: () => {
      return axios.get.bind(axios)(`activities?statuses=${status}`);
    },
  });
};

export type SaveContentMutationType = UseMutationResult<
  SaveContentResponseBody,
  ServerError,
  SaveContentRequestBody,
  unknown
>;
export const useSaveContentMutation = ({
  versionId,
  activityId,
  onSuccess,
}: MutationArgsType<SaveContentRequestBody, SaveContentResponseBody> &
  SaveContentRequestParams) => {
  const queryClient = useQueryClient();
  const axios = useAxiosAuth();

  return useMutation<
    SaveContentResponseBody,
    ServerError,
    SaveContentRequestBody
  >({
    mutationFn: (mutationArgs: SaveContentRequestBody) => {
      return axios.post.bind(axios)(
        `activity/${activityId}/version/${versionId}/content`,
        mutationArgs
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["version", activityId, versionId],
      });
      onSuccess && onSuccess();
    },
    onError: (e) => errorToast(e.message),
  });
};

export const useDeleteActivityContentMutation = ({
  activityId,
  versionId,
  contentId,
}: DeleteActivityContentParams) => {
  const queryClient = useQueryClient();
  const axios = useAxiosAuth();

  return useMutation<void, ServerError>({
    mutationFn: () =>
      axios.del.bind(axios)(
        `activity/${activityId}/version/${versionId}/content/${contentId}`
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["version", activityId, versionId],
      });
    },
    onError: (e) => errorToast(e.message),
  });
};

export const useUpdateVersionStatusMutation = ({
  activityId,
  versionId,
}: MutationArgsType<
  UpdateActivityStatusRequestBody,
  UpdateActivityStatusResponseBody
> &
  UpdateActivityStatusRequestParams) => {
  const queryClient = useQueryClient();
  const axios = useAxiosAuth();

  return useMutation<
    UpdateActivityStatusRequestBody,
    ServerError,
    UpdateActivityStatusRequestBody
  >({
    mutationFn: (mutationArgs: UpdateActivityStatusRequestBody) =>
      axios.post.bind(axios)(
        `update-activity/${activityId}/version/${versionId}/status`,
        mutationArgs
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["version", activityId, versionId],
      });
    },
    onError: (e) => errorToast(e.message),
  });
};

export const useDeleteDraftVersionMutation = ({
  activityId,
  versionId,
  onSuccess,
}: MutationArgsType<void, void> & DeleteDraftVersionParams) => {
  const queryClient = useQueryClient();
  const axios = useAxiosAuth();

  return useMutation<void, ServerError>({
    mutationFn: () =>
      axios.del.bind(axios)(`activity/${activityId}/version/${versionId}`),
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({
        queryKey: ["Draft"],
      });
    },
    onError: (e) => errorToast(e.message),
  });
};
