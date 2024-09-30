import { useQuery } from "@tanstack/react-query";
import { ServerError, CoreClient } from "@edu-platform/common/api";
import { useAxiosAuth } from "@infrastructure";

type Params = Parameters<CoreClient["getPublished"]>[0];
type Return = Awaited<ReturnType<CoreClient["getPublished"]>>;

export const useGetActivityPublishedQuery = ({ activityId }: Params) => {
  const axios = useAxiosAuth();
  const client = new CoreClient(axios);

  return useQuery<Return, ServerError>({
    queryKey: ["versions/published", { activityId }],
    queryFn: () => client.getPublished({ activityId }),
  });
};
export type { Return as GetActivityPublishedReturn };
