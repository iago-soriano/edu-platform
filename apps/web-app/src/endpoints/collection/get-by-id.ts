import { ServerError, ApiClient } from "@edu-platform/common/api";
import { useAxiosAuth } from "@infrastructure";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-key-factory";

type Params = Parameters<ApiClient["getCollection"]>[0];
type Response = Awaited<ReturnType<ApiClient["getCollection"]>>;

export const useGetCollectionQuery = ({ collectionId }: Params) => {
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useQuery<Response, ServerError>({
    queryKey: queryKeys.detail(collectionId),
    queryFn: () => client.getCollection({ collectionId }),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};
