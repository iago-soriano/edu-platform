import { TextContainer, TextInstruction } from "./common";
import { FormTextAreaField } from "@components/ui/Form";
import { z } from "zod";

export const TextInputSchema = z
  .string()
  .min(700, `Text must have at least ${700} characters`)
  .max(3000, `Text cannot have more than ${3000} characters`);

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
