import { OpenQuestionContainer, OpenQuestionInstruction } from "./common";
import { FormTextAreaField } from "@components/ui/Form";
import { Text } from "@components/ui/Typography";

type Props = {
  children: React.ReactNode;
  index?: number;
};

export const OpenQuestionDoForm = ({ children, index }: Props) => {
  return (
    <OpenQuestionContainer>
      <OpenQuestionInstruction />
      <Text>{children}</Text>

      <FormTextAreaField
        name={`openQuestions.${index}.answer`}
        isHeightSelfAdjusting
        textAreaClassName="resize-none overflow-y-hidden leading-relaxed"
      />
    </OpenQuestionContainer>
  );
};
