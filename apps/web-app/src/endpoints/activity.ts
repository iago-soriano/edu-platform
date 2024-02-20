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

type Request = Parameters<ApiClient["createNewActivity"]>[0];
type Return = Awaited<ReturnType<ApiClient["createNewActivity"]>>;

export type CreateNewActivityMutationType = UseMutationResult<
  Return,
  ServerError,
  Request
>;

export const useCreateNewActivityMutation = ({
  collectionId,
  onSuccess,
}: { collectionId: number } & MutationArgsType<void, Return>) => {
  const queryClient = useQueryClient();
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useMutation<Return, ServerError, void>({
    mutationFn: () => {
      return client.createNewActivity({ collectionId });
    },
    onSuccess: (d, v, c) => {
      queryClient.invalidateQueries({
        queryKey: ["versions"],
      });
      onSuccess && onSuccess(d, v, c);
    },
    onError: (e) => errorToast(`Algo deu errado: ${e.message}`),
  });
};
