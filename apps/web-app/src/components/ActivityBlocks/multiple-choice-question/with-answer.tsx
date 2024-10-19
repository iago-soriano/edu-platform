import {
  MultipleChoiceQuestionContainer,
  MultipleChoiceAlternativeContainer,
  MultipleChoiceAlternativesGroupContainer,
} from "./common";
import { MultipleChoiceQuestion as ResponseMultipleChoiceQuestionType } from "@edu-platform/common/domain/activity-block-schema";
import { Text } from "@components/ui/Typography";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "@components/ui/RadioGroup";
import { cx, hasErrorInput } from "@styles/utils";

type DisplayProps = {
  data: ResponseMultipleChoiceQuestionType;
  givenAnswer?: string;
};

export const MultipleChoiceQuestionWithAnswer = ({
  data,
  givenAnswer,
}: DisplayProps) => {
  return (
    <MultipleChoiceQuestionContainer>
      <Text>{data.question}</Text>
      <MultipleChoiceAlternativesGroupContainer>
        <RadioGroup>
          {data.alternatives.map((opt, idx) => (
            <div
              className={cx(
                "flex flex-row items-center gap-x-2 ml-2 p-1",
                idx === data.correctAnswer &&
                  "border-green-600 border-2 bg-green-600/30",
                givenAnswer &&
                  idx !== data.correctAnswer &&
                  idx === Number(givenAnswer) &&
                  "border-rose-500 border-2 bg-rose-500/30"
              )}
              key={idx}
            >
              <RadioGroupItem
                checked={!!givenAnswer?.length && idx === Number(givenAnswer)}
                value={`${idx}`}
                id={`${idx}`}
                disabled
              >
                <RadioGroupIndicator />
              </RadioGroupItem>
              <label htmlFor={`${idx}`}>{opt}</label>
            </div>
          ))}
        </RadioGroup>
      </MultipleChoiceAlternativesGroupContainer>
    </MultipleChoiceQuestionContainer>
  );
};
