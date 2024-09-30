/* import { useBaseMutation, UseBaseMutationCallbacksType } from "../base";
import {
  useMutation,
  useQuery,
  useInfiniteQuery,
  UseQueryResult,
  UseInfiniteQueryResult,
  InfiniteData,
} from "@tanstack/react-query"; */
import { CoreClient } from "@edu-platform/common/api";
import { SSRAxios } from "@infrastructure";

/* type Params = Parameters<CoreClient["listActivitiesForOwner"]>[0];
type Return = Awaited<ReturnType<CoreClient["listActivitiesForOwner"]>>;
export type ListQueryForOwnerReturn = UseQueryResult<Return, ServerError>;

export const useListActivitiesForOwnerQuery = ({
  pageSize,
  page,
  collectionId,
}: Params) => {
  const axios = useAxiosAuth();
  const client = new CoreClient(axios);

  return useQuery<Return, ServerError>({
    queryKey: ["activities", { page, pageSize }],
    queryFn: () =>
      client.listActivitiesForOwner({
        collectionId,
        pageSize,
        page,
      }),
  });
}; */

export const listActivitiesForOwnerByCollectionId = (
  page,
  pageSize,
  collectionId
) =>
  new CoreClient(SSRAxios).listActivitiesForOwner({
    page,
    collectionId,
    pageSize,
  });

export type ListActivitiesForOwnerResponse = Awaited<
  ReturnType<typeof listActivitiesForOwnerByCollectionId>
>;
