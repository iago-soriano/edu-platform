import { ServerError, ApiClient } from "@edu-platform/common/api";
import { useAxiosAuth } from "@infrastructure";
import { useQuery } from "@tanstack/react-query";

type Params = Parameters<ApiClient["listStudentsOfCollection"]>[0];
type Response = Awaited<ReturnType<ApiClient["listStudentsOfCollection"]>>;

export const useListStudentsOfCollectionQuery = ({
  collectionId,
  pageSize,
  page,
}: Params) => {
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useQuery<Response, ServerError>({
    queryKey: ["collection-participations", { page, collectionId, pageSize }],
    queryFn: () =>
      client.listStudentsOfCollection({ collectionId, pageSize, page }),
  });
};
