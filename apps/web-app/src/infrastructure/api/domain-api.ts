import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  UpdateActivityMetadataRequestBody,
  UpdateActivityMetadataResponseBody,
  GetActivityVersionResponseBody,
  CreateNewActivityRequestBody,
  CreateNewActivityResponseBody,
  GetActivitiesResponseBody,
  SaveContentRequestBody,
  SaveContentResponseBody,
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
> & { activityId?: string; versionId?: string } = MutationArgsDefaultValue) => {
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
      onSuccess(d, v, c);
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      queryClient.invalidateQueries({
        queryKey: ["version", activityId, versionId],
      });
    },
    onError,
    onSettled,
  });
};

export const useGetActivitiesQuery = () => {
  const { axiosIsAuthed } = useAuthContext();
  return useQuery<GetActivitiesResponseBody, ServerError>({
    queryKey: ["activities"],
    queryFn: () => {
      console.log("fetching");
      return axios.get.bind(axios)("activities");
    },
    enabled: axiosIsAuthed,
  });
};

export const useSaveContentMutation = (
  args: MutationArgsType<unknown, SaveContentResponseBody> & {
    activityId?: string;
    versionId?: string;
  }
) =>
  useMutation<SaveContentResponseBody, ServerError, unknown>({
    mutationFn: (mutationArgs: unknown) => {
      console.log({ mutationArgs });
      return axios.post.bind(axios)(
        `activity/${args.activityId}/version/${args.versionId}/content`,
        mutationArgs
      );
    },
    onSuccess: args.onSuccess,
    onError: () => errorToast("Algo deu errado :("),
  });
