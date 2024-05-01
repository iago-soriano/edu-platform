import { ServerError, ApiClient } from "@edu-platform/common/api";
import { useAxiosAuth } from "@infrastructure";
import { useQuery } from "@tanstack/react-query";

type Response = Awaited<ReturnType<ApiClient["listCollectionsForOwner"]>>;

export const useListCollectionsForParticipantQuery = ({
  pageSize,
  page,
  isPrivate,
}) => {
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useQuery<Response, ServerError>({
    queryKey: ["collections", { isPrivate, page, pageSize }],
    // placeholderData: keepPreviousData,
    queryFn: () =>
      client.listCollectionsForOwner({ isPrivate, page, pageSize }),
  });
};
export type { Response as ListCollectionsForParticipantResponse };
