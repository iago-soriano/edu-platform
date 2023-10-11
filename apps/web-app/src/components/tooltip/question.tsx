import { Icons } from "@components";
import { Tooltip } from './base';

export const QuestionTooltip = ({ content }) => {
  return (
    <Tooltip content={content}>
      <Icons.QUESTION_CIRCLE />
    </Tooltip>
  );
};
