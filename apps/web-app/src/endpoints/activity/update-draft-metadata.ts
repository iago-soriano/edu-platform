import { ServerError, ApiClient } from "@edu-platform/common/api";
import { useBaseMutation, UseBaseMutationCallbacksType } from "../base";

type Params = Parameters<ApiClient["updateVersionMetadata"]>[0];
type Return = Awaited<ReturnType<ApiClient["updateVersionMetadata"]>>;

export const useUpdateVersionMetadataMutation = (
  args: Params & UseBaseMutationCallbacksType<Params, Return>
) =>
  useBaseMutation<Params, Return>({
    mutationFn: (client, mArgs) => client.updateVersionMetadata(mArgs),
    invalidateQueries: ["versions/draft"],
    ...args,
  });
