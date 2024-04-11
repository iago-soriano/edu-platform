export const filterOutDuplicates = <T>(arr: T[]) => {
  const hash: { [id: string]: any } = {};

  return arr.filter((item) => {
    if (!hash[(item as any).id]) {
      hash[(item as any).id] = true;
      return true;
    }
    return false;
  });
};
