import { useQuery } from "@tanstack/react-query";
import { ServerError, ApiClient } from "@edu-platform/common/api";
import { useAxiosAuth } from "@infrastructure";

type Params = Parameters<ApiClient["getDraft"]>[0];
export type Return = Awaited<ReturnType<ApiClient["getDraft"]>>;

export const useGetActivityDraftQuery = ({ activityId }: Params) => {
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useQuery<Return, ServerError>({
    queryKey: ["versions/draft", { activityId }],
    queryFn: () => client.getDraft({ activityId }),
  });
};
