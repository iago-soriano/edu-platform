import { OpenQuestionContainer, OpenQuestionInstruction } from "./common";
import { FormTextAreaField } from "@components/ui/Form";
import { DomainRules } from "@edu-platform/common/domain/rules";
import { z } from "zod";

export const OpenQuestionInputSchema = z
  .string()
  .min(
    DomainRules.ACTIVITY_BLOCKS.OPEN_QUESTION.MIN_LENGTH_CHARACTERS,
    `Open Question must have at least ${DomainRules.ACTIVITY_BLOCKS.OPEN_QUESTION.MIN_LENGTH_CHARACTERS} characters`
  )
  .max(
    DomainRules.ACTIVITY_BLOCKS.OPEN_QUESTION.MAX_LENGTH_CHARACTERS,
    `Open Question cannot have more than ${DomainRules.ACTIVITY_BLOCKS.OPEN_QUESTION.MAX_LENGTH_CHARACTERS} characters`
  );

export const OpenQuestionInput = ({ id, text }) => {
  return (
    <OpenQuestionContainer>
      <OpenQuestionInstruction />

      <FormTextAreaField
        id={id}
        name="openQuestion"
        defaultValue={text}
        isHeightSelfAdjusting
        textAreaClassName="resize-none overflow-y-hidden leading-relaxed"
      />
    </OpenQuestionContainer>
  );
};
