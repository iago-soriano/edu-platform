import { Text } from "@components/ui/Typography";
import { z } from "zod";
import { FormTextAreaField } from "@components/ui/Form";

export const TextInputSchema = z
  .string()
  .min(1000, `Text must have at least ${1000} characters`)
  .max(3000, `Text cannot have more than ${3000} characters`);

const TextContainer = ({ children }) => (
  <div className="flex flex-col gap-y-2">{children}</div>
);

const TextInstruction = () => (
  <Text className="font-semibold">
    Read the text and then answer the questions
  </Text>
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
