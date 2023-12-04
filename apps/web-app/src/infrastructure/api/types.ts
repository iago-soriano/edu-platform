import { ServerError } from "@edu-platform/common";

export type ErrorCallback<V> = (
  e: ServerError,
  variables: V,
  context: unknown
) => unknown;

export type SuccessCallback<V, D> = (
  data: D,
  variables: V,
  context: unknown
) => unknown;

export type MutationArgsType<ReqBody, RespBody> = Partial<{
  onError: ErrorCallback<ReqBody>;
  onSuccess: SuccessCallback<ReqBody, RespBody>;
  onSettled: (args: unknown) => unknown;
}>;
export const MutationArgsDefaultValue = {
  onError: () => {},
  onSuccess: () => {},
};
