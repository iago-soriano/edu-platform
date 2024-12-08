import { ActivityBlockType } from "@edu-platform/common/domain/enums";

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

const blocksOrder = [
  ActivityBlockType.TEXT,
  ActivityBlockType.OPEN_QUESTION,
  ActivityBlockType.MULTIPLE_CHOICE_QUESTION,
];

export const sortActivityBlocks = (blocks: { type: ActivityBlockType }[]) => {
  const res: any[] = [];

  blocksOrder.forEach((type) => {
    blocks.forEach((bl) => {
      if (bl.type === type) {
        res.push(bl);
      }
    });
  });

  return res;
};
