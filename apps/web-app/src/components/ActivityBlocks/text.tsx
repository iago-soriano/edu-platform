import { Text } from "@components/ui/Typography";
import { z } from "zod";
import { FormTextAreaField } from "@components/ui/Form";
import { cx } from "@styles/utils";

export const TextInputSchema = z
  .string()
  .min(700, `Text must have at least ${700} characters`)
  .max(3000, `Text cannot have more than ${3000} characters`);

const TextContainer = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cx("flex flex-col gap-y-2", className)}>{children}</div>
);

const TextInstruction = () => (
  <Text className="font-semibold">
    Read the text and then answer the questions
  </Text>
);

export const TextBlock = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <TextContainer className={className}>
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
