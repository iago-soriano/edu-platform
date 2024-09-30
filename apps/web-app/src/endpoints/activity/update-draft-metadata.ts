import { ServerError, CoreClient } from "@edu-platform/common/api";
import { useBaseMutation, UseBaseMutationCallbacksType } from "../base";

type Params = Parameters<CoreClient["updateVersionMetadata"]>[0];
type Return = Awaited<ReturnType<CoreClient["updateVersionMetadata"]>>;

export const useUpdateVersionMetadataMutation = (
  args: Params & UseBaseMutationCallbacksType<Params, Return>
) =>
  useBaseMutation<Params, Return>({
    mutationFn: (client, mArgs) => client.updateVersionMetadata(mArgs),
    invalidateQueries: ["versions/draft"],
    ...args,
  });
