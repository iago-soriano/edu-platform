import { ServerError, ApiClient } from "@edu-platform/common/api";
import { useAxiosAuth } from "@infrastructure";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-key-factory";

type Response = Awaited<ReturnType<ApiClient["listCollectionsForParticipant"]>>;

export const useListCollectionsForParticipantQuery = ({ pageSize, page }) => {
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useQuery<Response, ServerError>({
    queryKey: queryKeys.studentList({
      page,
    }),
    // placeholderData: keepPreviousData,
    queryFn: () => client.listCollectionsForParticipant({ page, pageSize }),
  });
};
export type { Response as ListCollectionsForParticipantResponse };
