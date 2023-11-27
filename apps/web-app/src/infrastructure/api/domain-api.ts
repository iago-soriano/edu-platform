import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  // get topics
  GetTopicsRequestBody,
  GetTopicsResponseBody,
  // save activity
  SaveActivityRequestBody,
  SaveActivityResponseBody,
} from "@edu-platform/common/api";
import { ServerError } from "@edu-platform/common";
import { axios } from "@infrastructure";
import {
  ErrorCallback,
  MutationArgsType,
  MutationArgsDefaultValue,
} from "./types";

export const useGetTopicsMutation = ({
  onError,
  onSuccess,
}: MutationArgsType<GetTopicsRequestBody> = MutationArgsDefaultValue) =>
  useMutation<GetTopicsResponseBody, ServerError, GetTopicsRequestBody>(
    (args: GetTopicsRequestBody) =>
      axios.post.bind(axios)("change-password-request", args),
    {
      onError,
      onSuccess,
    }
  );
