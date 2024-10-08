import { ServerError, CoreClient } from "@edu-platform/common/api";
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
  context?: unknown
) => unknown;

type SuccessCallback<V, D> = (
  data: D,
  variables: V,
  context?: unknown
) => unknown;

type SettledCallback<V, D> = (
  data: D,
  e: ServerError,
  variables: V,
  context?: unknown
) => unknown;

export type UseBaseMutationCallbacksType<Req, Res> = {
  onError?: ErrorCallback<Req>;
  onSuccess?: SuccessCallback<Req, Res>;
  onSettled?: SettledCallback<Req, Res>;
};

export const useBaseMutation = <Req, Res>({
  mutationFn,
  invalidateQueries,
  onSuccess,
  onError,
  onSettled,
}: {
  mutationFn: (client: CoreClient, args: Req) => Promise<Res>;
  invalidateQueries?: readonly any[];
} & UseBaseMutationCallbacksType<Req, Res>) => {
  const queryClient = useQueryClient();
  const axios = useAxiosAuth();
  const client = new CoreClient(axios);

  return useMutation<Res, ServerError, Req>({
    mutationFn: (args) => mutationFn(client, args),
    onSuccess: async (d, v, c) => {
      onSuccess && onSuccess(d, v, c);
    },
    onError: (e, v, c) => {
      // not a real API error, just next redirecting
      if (e.message === "NEXT_REDIRECT") return;
      errorToast(e.message);
      onError && onError(e, v, c);
    },
    onSettled: (d, e, v, c) => {
      // invalidateQueries?.map((invalidate) =>
      //   queryClient.invalidateQueries({
      //     queryKey: [invalidate],
      //   })
      // );
      if (invalidateQueries)
        queryClient.invalidateQueries({ queryKey: invalidateQueries });
      onSettled && onSettled(d!, e!, v, c);
    },
  });
};
