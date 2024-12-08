import { OpenQuestionContainer, OpenQuestionInstruction } from "./common";
import { Text } from "@components/ui/Typography";

type Props = {
  question: string;
  answer?: string;
};

export const OpenQuestionWithAnswer = ({ question, answer }: Props) => {
  return (
    <OpenQuestionContainer>
      <Text>{question}</Text>
      <textarea
        className="resize-none overflow-y-hidden leading-relaxed bg-secondary border p-2"
        rows={3}
        defaultValue={answer}
        disabled
      />
    </OpenQuestionContainer>
  );
};
