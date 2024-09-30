import { ServerError, CoreClient } from "@edu-platform/common/api";
import { useAxiosAuth } from "@infrastructure";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-key-factory";

type Params = Parameters<CoreClient["listStudentsOfCollection"]>[0];
type Response = Awaited<ReturnType<CoreClient["listStudentsOfCollection"]>>;

export const useListStudentsOfCollectionQuery = ({
  collectionId,
  pageSize,
  page,
}: Params) => {
  const axios = useAxiosAuth();
  const client = new CoreClient(axios);

  return useQuery<Response, ServerError>({
    queryKey: queryKeys.participants(collectionId),
    queryFn: () =>
      client.listStudentsOfCollection({ collectionId, pageSize, page }),
  });
};
