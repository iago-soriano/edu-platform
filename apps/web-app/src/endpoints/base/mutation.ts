import { ServerError, ApiClient } from "@edu-platform/common";
import { useAxiosAuth } from "@infrastructure";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
  MutationFunction,
} from "@tanstack/react-query";
import { errorToast } from "@components";

type ErrorCallback<V> = (
  e: ServerError,
  variables: V,
  context: unknown
) => unknown;

type SuccessCallback<V, D> = (
  data?: D,
  variables?: V,
  context?: unknown
) => unknown;

export type UseBaseMutationCallbacksType<Req, Res> = {
  onError?: ErrorCallback<Req>;
  onSuccess?: SuccessCallback<Req, Res>;
  onSettled?: (args: unknown) => unknown;
};

export const useBaseMutation = <Req, Res>({
  mutationFn,
  invalidateQueries,
  onSuccess,
  onError,
  onSettled,
}: {
  mutationFn: (client: ApiClient, args: Req) => Promise<Res>;
  invalidateQueries?: string[];
} & UseBaseMutationCallbacksType<Req, Res>) => {
  const queryClient = useQueryClient();
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useMutation<Res, ServerError, Req>({
    mutationFn: (args) => mutationFn(client, args),
    onSuccess: (d, v, c) => {
      queryClient.invalidateQueries({
        queryKey: invalidateQueries,
      });
      onSuccess && onSuccess(d, v, c);
    },
    onError: (e, v, c) => {
      // not a real API error, just next redirecting
      if (e.message === "NEXT_REDIRECT") return;
      errorToast(e.message);
      onError && onError(e, v, c);
    },
    onSettled,
  });
};