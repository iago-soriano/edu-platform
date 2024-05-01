import { useBaseMutation, UseBaseMutationCallbacksType } from "../base";
import { ServerError, ApiClient } from "@edu-platform/common/api";

type Params = Parameters<ApiClient["saveQuestion"]>[0];
type Return = Awaited<ReturnType<ApiClient["saveQuestion"]>>;

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
