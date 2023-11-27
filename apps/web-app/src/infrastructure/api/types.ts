import { ServerError } from "@edu-platform/common";

export type ErrorCallback<V> = (
  e: ServerError,
  variables: V,
  context: unknown
) => unknown;

export type MutationArgsType<ReqBody> = Partial<{
  onError: ErrorCallback<ReqBody>;
  onSuccess: () => unknown;
}>;
export const MutationArgsDefaultValue = {
  onError: () => {},
  onSuccess: () => {},
};
