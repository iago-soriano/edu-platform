import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  UpdateActivityMetadataRequestBody,
  UpdateActivityMetadataResponseBody,
  GetActivityVersionResponseBody,
  CreateNewActivityRequestBody,
  CreateNewActivityResponseBody,
  GetActivityVersionsResponseBody,
  SaveContentRequestBody,
  SaveContentRequestParams,
  SaveContentResponseBody,
  DeleteActivityContentParams,
} from "@edu-platform/common/api";
import { ServerError } from "@edu-platform/common";
import { axios } from "@infrastructure";
import {
  ErrorCallback,
  MutationArgsType,
  MutationArgsDefaultValue,
} from "./types";
import { errorToast } from "@components";
import { useAuthContext } from "@contexts";

const logMutation = ({ isLoading, isError, isIdle, isSuccess, isPaused }) =>
  console.log({ isLoading, isError, isIdle, isSuccess, isPaused });

export const useCreateActivityMutation = (
  args: MutationArgsType<
    CreateNewActivityRequestBody,
    CreateNewActivityResponseBody
  >
) => {
  const queryClient = useQueryClient();
  return useMutation<
    CreateNewActivityResponseBody,
    ServerError,
    CreateNewActivityRequestBody
  >({
    mutationFn: (args: CreateNewActivityRequestBody) =>
      axios.post.bind(axios)("create-new-activity", args),
    onSuccess: ({ activityId, versionId }, v, c) => {
      args.onSuccess({ activityId, versionId }, v, c);
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
    onError: () => errorToast("Algo deu errado :("),
  });
};

export const useGetActivityVersionQuery = ({ activityId, versionId }) =>
  useQuery<GetActivityVersionResponseBody, ServerError>({
    queryKey: ["version", activityId, versionId],
    queryFn: () =>
      axios.get.bind(axios)(`activity/${activityId}/version/${versionId}`),
  });

export const useUpdateVersionMetadataMutation = ({
  onError,
  onSuccess,
  onSettled,
  versionId,
  activityId,
}: MutationArgsType<
  UpdateActivityMetadataRequestBody,
  UpdateActivityMetadataResponseBody
> & { activityId?: number; versionId?: number } = MutationArgsDefaultValue) => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateActivityMetadataResponseBody,
    ServerError,
    UpdateActivityMetadataRequestBody
  >({
    mutationFn: (args: UpdateActivityMetadataRequestBody) =>
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
    onError,
    onSettled,
  });
};

export const useGetActivityVersionsQuery = () => {
  const { axiosIsAuthed } = useAuthContext();
  return useQuery<GetActivityVersionsResponseBody, ServerError>({
    queryKey: ["activities"],
    queryFn: () => {
      return axios.get.bind(axios)("activities");
    },
    enabled: axiosIsAuthed,
  });
};

export const useSaveContentMutation = ({
  versionId,
  activityId,
}: SaveContentRequestParams) => {
  const queryClient = useQueryClient();
  return useMutation<
    SaveContentResponseBody,
    ServerError,
    SaveContentRequestBody
  >({
    mutationFn: (mutationArgs: SaveContentRequestBody) => {
      // console.log({ mutationArgs });
      return axios.post.bind(axios)(
        `activity/${activityId}/version/${versionId}/content`,
        mutationArgs
      );
    },
    onSuccess: (d, v, c) => {
      queryClient.invalidateQueries({
        queryKey: ["version", activityId, versionId],
      });
    },
    onError: () => errorToast("Algo deu errado :("),
  });
};

export const useDeleteActivityContentMutation = ({
  activityId,
  versionId,
  contentId,
}: DeleteActivityContentParams) => {
  const queryClient = useQueryClient();
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
    onError: () => errorToast("Algo deu errado :("),
  });
};
