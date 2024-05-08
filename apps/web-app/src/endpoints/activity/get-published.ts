import { useQuery } from "@tanstack/react-query";
import { ServerError, ApiClient } from "@edu-platform/common/api";
import { useAxiosAuth } from "@infrastructure";

type Params = Parameters<ApiClient["getPublished"]>[0];
type Return = Awaited<ReturnType<ApiClient["getPublished"]>>;

export const useGetActivityPublishedQuery = ({ activityId }: Params) => {
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useQuery<Return, ServerError>({
    queryKey: ["versions/published", { activityId }],
    queryFn: () => client.getPublished({ activityId }),
  });
};
export type { Return as GetActivityPublishedReturn };
