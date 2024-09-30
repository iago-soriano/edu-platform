import { useBaseMutation, UseBaseMutationCallbacksType } from "../base";
import { ServerError, CoreClient } from "@edu-platform/common/api";

type Params = Parameters<CoreClient["saveQuestion"]>[0];
type Return = Awaited<ReturnType<CoreClient["saveQuestion"]>>;

export const useSaveQuestionMutation = (
  args: UseBaseMutationCallbacksType<Params, Return>
) =>
  useBaseMutation<Params, Return>({
    mutationFn: (client, args) => {
      console.log({ args });
      return client.saveQuestion(args);
    },
    invalidateQueries: ["versions/draft"],
    ...args,
  });
