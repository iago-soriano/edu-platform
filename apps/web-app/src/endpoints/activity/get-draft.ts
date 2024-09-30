import { useQuery } from "@tanstack/react-query";
import { ServerError, CoreClient } from "@edu-platform/common/api";
import { useAxiosAuth } from "@infrastructure";

type Params = Parameters<CoreClient["getDraft"]>[0];
export type Return = Awaited<ReturnType<CoreClient["getDraft"]>>;

export const useGetActivityDraftQuery = ({ activityId }: Params) => {
  const axios = useAxiosAuth();
  const client = new CoreClient(axios);

  return useQuery<Return, ServerError>({
    queryKey: ["versions/draft", { activityId }],
    queryFn: () => client.getDraft({ activityId }),
  });
};
