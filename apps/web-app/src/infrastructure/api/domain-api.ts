import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
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
  UpdateActivityStatusRequestParams,
  UpdateActivityStatusRequestBody,
  UpdateActivityStatusResponseBody,
} from "@edu-platform/common/api";
import { ServerError } from "@edu-platform/common";
import { axios, useAxiosAuth } from "@infrastructure";
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
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
    onError: () => errorToast("Algo deu errado :("),
  });
};

export const useGetActivityVersionQuery = ({ activityId, versionId }) => {
  const axios = useAxiosAuth();

  return useQuery<GetActivityVersionResponseBody, ServerError>({
    queryKey: ["version", activityId, versionId],
    queryFn: () =>
      axios.get.bind(axios)(`activity/${activityId}/version/${versionId}`),
  });
};

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
  const axios = useAxiosAuth();

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
    onError: (e) => errorToast(e.message),
    onSettled,
  });
};

export const useGetActivityVersionsQuery = () => {
  const axios = useAxiosAuth();

  return useQuery<GetActivityVersionsResponseBody, ServerError>({
    queryKey: ["activities"],
    queryFn: () => {
      return axios.get.bind(axios)("activities");
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
}: SaveContentRequestParams) => {
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
    onSuccess: (d, v, c) => {
      queryClient.invalidateQueries({
        queryKey: ["version", activityId, versionId],
      });
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
    onError: () => errorToast("Algo deu errado :("),
  });
};

export const useUpdateVersionStatusMutation = ({
  activityId,
  versionId,
}: UpdateActivityStatusRequestParams) => {
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
