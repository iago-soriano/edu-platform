import { useBaseMutation, UseBaseMutationCallbacksType } from "../base";

import { ServerError, ApiClient } from "@edu-platform/common/api";

type Params = Parameters<ApiClient["publishDraft"]>[0];
type Return = Awaited<ReturnType<ApiClient["publishDraft"]>>;

export const usePublishDraftMutation = (
  args: UseBaseMutationCallbacksType<Params, Return>
) =>
  useBaseMutation<Params, Return>({
    mutationFn: (client, args) => client.publishDraft(args),
    invalidateQueries: ["versions"],
    ...args,
  });
