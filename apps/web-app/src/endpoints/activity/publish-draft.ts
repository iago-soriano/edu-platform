import { useBaseMutation, UseBaseMutationCallbacksType } from "../base";

import { ServerError, CoreClient } from "@edu-platform/common/api";

type Params = Parameters<CoreClient["publishDraft"]>[0];
type Return = Awaited<ReturnType<CoreClient["publishDraft"]>>;

export const usePublishDraftMutation = (
  args: UseBaseMutationCallbacksType<Params, Return>
) =>
  useBaseMutation<Params, Return>({
    mutationFn: (client, args) => client.publishDraft(args),
    invalidateQueries: ["versions"],
    ...args,
  });
