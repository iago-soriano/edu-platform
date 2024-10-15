import { Text } from "@components/ui/Typography";
import { DomainRules } from "@edu-platform/common/domain/rules";
import { FormTextAreaField } from "@components/ui/Form";
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

const OpenQuestionContainer = ({ children }) => (
  <div className="flex flex-col gap-y-2 mt-4 p-4">{children}</div>
);

const OpenQuestionInstruction = () => (
  <Text className="font-semibold">
    Answer the following question in your own words
  </Text>
);

export const OpenQuestion = ({ children }) => {
  return (
    <OpenQuestionContainer>
      <OpenQuestionInstruction />
      <Text>{children}</Text>
    </OpenQuestionContainer>
  );
};

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
