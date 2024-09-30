import { ServerError, CoreClient } from "@edu-platform/common/api";
import { useAxiosAuth } from "@infrastructure";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-key-factory";
import { SSRAxios } from "@infrastructure";

export type Response = Awaited<
  ReturnType<CoreClient["listCollectionsForOwner"]>
>;

export const useListCollectionsForOwnerQuery = ({
  pageSize,
  page,
  isPrivate,
}) => {
  const axios = useAxiosAuth();
  const client = new CoreClient(axios);

  return useQuery<Response, ServerError>({
    queryKey: queryKeys.teacherList({
      page,
      isPrivate,
    }),
    // placeholderData: keepPreviousData,
    queryFn: () =>
      client.listCollectionsForOwner({ isPrivate, page, pageSize }),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};
export type { Response as ListCollectionsForOwnerResponse };

export const preFetchPrivate = (queryClient, page) => {
  return queryClient.prefetchQuery({
    queryKey: queryKeys.teacherList({
      page,
      isPrivate: true,
    }),
    queryFn: () =>
      new CoreClient(SSRAxios).listCollectionsForOwner({
        isPrivate: true,
        page,
      }),
  });
};

export const preFetchPublic = (queryClient, page) => {
  return queryClient.prefetchQuery({
    queryKey: queryKeys.teacherList({
      page,
      isPrivate: false,
    }),
    queryFn: () =>
      new CoreClient(SSRAxios).listCollectionsForOwner({
        isPrivate: false,
        page,
      }),
  });
};
