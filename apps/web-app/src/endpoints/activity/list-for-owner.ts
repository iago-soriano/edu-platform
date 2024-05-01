import { useBaseMutation, UseBaseMutationCallbacksType } from "../base";
import {
  useMutation,
  useQuery,
  useInfiniteQuery,
  UseQueryResult,
  UseInfiniteQueryResult,
  InfiniteData,
} from "@tanstack/react-query";
import { ServerError, ApiClient } from "@edu-platform/common/api";
import { useAxiosAuth } from "@infrastructure";

type Params = Parameters<ApiClient["listActivitiesForOwner"]>[0];
type Return = Awaited<ReturnType<ApiClient["listActivitiesForOwner"]>>;
export type ListQueryForOwnerReturn = UseQueryResult<Return, ServerError>;

export const useListActivitiesForOwnerQuery = ({
  pageSize,
  page,
  collectionId,
}: Params) => {
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useQuery<Return, ServerError>({
    queryKey: ["activities", { page, pageSize }],
    queryFn: () =>
      client.listActivitiesForOwner({
        collectionId,
        pageSize,
        page,
      }),
  });
};
