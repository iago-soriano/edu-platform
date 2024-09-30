import { ServerError, CoreClient } from "@edu-platform/common/api";
import { useBaseMutation, UseBaseMutationCallbacksType } from "../base";
import { queryKeys } from "./query-key-factory";

type Request = Parameters<CoreClient["createNewCollection"]>[0];
type Return = Awaited<ReturnType<CoreClient["createNewCollection"]>>;

export const useCreateNewCollectionMutation = (
  args: UseBaseMutationCallbacksType<Request, Return>
) =>
  useBaseMutation<Request, Return>({
    mutationFn: (client, args) => client.createNewCollection(args),
    invalidateQueries: queryKeys.teacherList({ page: 0, isPrivate: true }),
    ...args,
  });
