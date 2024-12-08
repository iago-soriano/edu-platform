import { MultipleChoiceQuestion as ResponseMultipleChoiceQuestionType } from "@edu-platform/common/domain/activity-block-schema";
import { Text } from "@components/ui/Typography";
import {
  MultipleChoiceQuestionContainer,
  MultipleChoiceAlternativesGroupContainer,
  MultipleChoiceQuestionInstruction,
} from "./common";
import { FormRadioGroupField } from "@components/ui/Form";

type AnswerProps = {
  data: ResponseMultipleChoiceQuestionType;
  index?: number;
};

export const MultipleChoiceQuestionDoForm = ({ data, index }: AnswerProps) => {
  return (
    <MultipleChoiceQuestionContainer>
      <MultipleChoiceQuestionInstruction />
      <Text>{data.question}</Text>
      <MultipleChoiceAlternativesGroupContainer>
        <FormRadioGroupField
          name={`multipleChoiceQuestions.${index}.answer`}
          options={data.alternatives.map((alt, idx) => ({
            value: `${idx}`,
            label: alt,
          }))}
        />
      </MultipleChoiceAlternativesGroupContainer>
    </MultipleChoiceQuestionContainer>
  );
};
