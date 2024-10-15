import { Text } from "@components/ui/Typography";
import { MultipleChoiceQuestion as ResponseMultipleChoiceQuestionType } from "@edu-platform/common/domain/activity-block-schema";
import {
  FormTextAreaField,
  FormSwitchField,
  FormTextField,
} from "@components/ui/Form";
import { z } from "zod";
import { DomainRules } from "@edu-platform/common/domain/rules";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "@components/ui/RadioGroup";

const AlternativeInputSchema = z.object({
  text: z
    .string()
    .min(
      DomainRules.ACTIVITY_BLOCKS.MULTIPLE_CHOICE_QUESTION.ALTERNATIVE
        .MIN_LENGTH_CHARACTERS,
      `Alternatives must have at least ${DomainRules.ACTIVITY_BLOCKS.MULTIPLE_CHOICE_QUESTION.ALTERNATIVE.MIN_LENGTH_CHARACTERS} characters`
    )
    .max(
      DomainRules.ACTIVITY_BLOCKS.MULTIPLE_CHOICE_QUESTION.ALTERNATIVE
        .MAX_LENGTH_CHARACTERS,
      `Alternatives cannot have more than ${DomainRules.ACTIVITY_BLOCKS.MULTIPLE_CHOICE_QUESTION.ALTERNATIVE.MAX_LENGTH_CHARACTERS} characters`
    ),
  isCorrect: z.boolean(),
});

const MultipleChoiceQuestionSchema = z.object({
  text: z
    .string()
    .min(
      DomainRules.ACTIVITY_BLOCKS.MULTIPLE_CHOICE_QUESTION.QUESTION
        .MIN_LENGTH_CHARACTERS,
      `Questions must have at least ${DomainRules.ACTIVITY_BLOCKS.MULTIPLE_CHOICE_QUESTION.QUESTION.MIN_LENGTH_CHARACTERS} characters`
    )
    .max(
      DomainRules.ACTIVITY_BLOCKS.MULTIPLE_CHOICE_QUESTION.QUESTION
        .MAX_LENGTH_CHARACTERS,
      `Questions cannot have more than ${DomainRules.ACTIVITY_BLOCKS.MULTIPLE_CHOICE_QUESTION.QUESTION.MAX_LENGTH_CHARACTERS} characters`
    ),
  alternatives: AlternativeInputSchema.array().refine(
    (val) => {
      console.log({ val });
      return val.filter((alt) => alt.isCorrect).length === 1;
    },
    {
      message:
        "Each multiple choice question must have exactly one correct answer",
    }
  ),
});
export const MultipleChoiceQuestionInputSchema =
  MultipleChoiceQuestionSchema.array();

const MultipleChoiceAlternativeContainer = ({ children }) => (
  <div className="flex flex-row gap-x-2 ml-2">{children}</div>
);

const MultipleChoiceAlternativesGroupContainer = ({ children }) => (
  <div className="flex flex-col gap-y-2 ">{children}</div>
);

const MultipleChoiceQuestionContainer = ({ children }) => (
  <div className="flex flex-col gap-y-2 mt-4 p-4">{children}</div>
);

const MultipleChoiceQuestionInstruction = () => (
  <Text className="font-semibold">Choose the correct alternative</Text>
);

type DisplaProps = {
  data: ResponseMultipleChoiceQuestionType;
  disabled?: boolean;
};

export const MultipleChoiceQuestion = ({ data, disabled }: DisplaProps) => {
  return (
    <MultipleChoiceQuestionContainer>
      <MultipleChoiceQuestionInstruction />
      <Text>{data.question}</Text>
      <MultipleChoiceAlternativesGroupContainer>
        <RadioGroup>
          {data.alternatives.map((alt, idx) => (
            <MultipleChoiceAlternativeContainer key={idx}>
              <RadioGroupItem value={alt} id={alt} disabled={disabled}>
                <RadioGroupIndicator />
              </RadioGroupItem>
              <label htmlFor={alt}>{alt}</label>
            </MultipleChoiceAlternativeContainer>
          ))}
        </RadioGroup>
      </MultipleChoiceAlternativesGroupContainer>
    </MultipleChoiceQuestionContainer>
  );
};

type InputProps = {
  id: string;
  index: number;
  data: ResponseMultipleChoiceQuestionType;
};
export const MultipleChoiceQuestionInput = ({
  id,
  data,
  index,
}: InputProps) => {
  //   console.log(text);
  return (
    <MultipleChoiceQuestionContainer>
      <MultipleChoiceQuestionInstruction />
      <FormTextField
        id={id}
        className="w-[80%]"
        name={`multipleChoiceQuestions.${index}.text`}
        defaultValue={data.question}
        //   isHeightSelfAdjusting
        //   textAreaClassName="resize-none overflow-y-hidden leading-relaxed"
      />
      <MultipleChoiceAlternativesGroupContainer>
        {data.alternatives.map((alt, idx) => (
          <MultipleChoiceAlternativeContainer key={idx}>
            <FormSwitchField
              labelOnTop
              //   default
              name={`multipleChoiceQuestions.${index}.alternatives.${idx}.isCorrect`}
              label="Is correct?"
            />
            <FormTextField
              id={id}
              className="w-[80%]"
              name={`multipleChoiceQuestions.${index}.alternatives.${idx}.text`}
              //   defaultValue={alt}
              //   isHeightSelfAdjusting
              //   textAreaClassName="resize-none overflow-y-hidden leading-relaxed"
            />
          </MultipleChoiceAlternativeContainer>
        ))}
      </MultipleChoiceAlternativesGroupContainer>
    </MultipleChoiceQuestionContainer>
  );
};
