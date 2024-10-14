import { Text } from "@components/ui/Typography";
import { z } from "zod";
import { FormTextAreaField } from "@components/ui/Form";
import { DomainRules } from "@edu-platform/common/domain/rules";

export const TextInputSchema = z
  .string()
  .min(
    DomainRules.ACTIVITY_BLOCKS.TEXT.MIN_LENGTH_WORDS * 5,
    `Text must have at least ${DomainRules.ACTIVITY_BLOCKS.TEXT.MIN_LENGTH_WORDS * 5} characters`
  )
  .max(
    DomainRules.ACTIVITY_BLOCKS.TEXT.MAX_LENGTH_WORDS * 10,
    `Text cannot have more than ${DomainRules.ACTIVITY_BLOCKS.TEXT.MAX_LENGTH_WORDS * 10} characters`
  );

const TextContainer = ({ children }) => (
  <div className="flex flex-col gap-y-2">{children}</div>
);

const TextInstruction = () => (
  <Text className="font-bold">Read the text and then answer the questions</Text>
);

export const TextBlock = ({ children }) => {
  return (
    <TextContainer>
      <TextInstruction />
      <Text className="leading-relaxed">{children}</Text>
    </TextContainer>
  );
};

export const TextInput = ({ id, text }) => {
  return (
    <TextContainer>
      <TextInstruction />
      <FormTextAreaField
        id={id}
        name="text"
        defaultValue={text}
        isHeightSelfAdjusting
        textAreaClassName="resize-none overflow-y-hidden leading-relaxed"
      />
    </TextContainer>
  );
};
