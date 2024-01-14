export const parseOrThrowParamsWithIds = <T>(
  params: unknown,
  parser: (args: unknown) => T
) => {
  try {
    return parser(params);
  } catch (ex) {
    throw new Error("Ids must be numbers");
  }
};
