import { MultipleChoiceQuestion as ResponseMultipleChoiceQuestionType } from "@edu-platform/common/domain/activity-block-schema";
import { useFormContext } from "react-hook-form";
import {
  MultipleChoiceQuestionContainer,
  MultipleChoiceAlternativesGroupContainer,
  MultipleChoiceQuestionInstruction,
  MultipleChoiceAlternativeContainer,
} from "./common";
import { FormSwitchField, FormTextField } from "@components/ui/Form";
import { DomainRules } from "@edu-platform/common/domain/rules";
import { z } from "zod";

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
      // console.log({ val });
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
  const { control } = useFormContext();

  const alternativesRootErrors =
    control._formState.errors.multipleChoiceQuestions?.[index]?.alternatives
      ?.root?.message;

  return (
    <MultipleChoiceQuestionContainer error={alternativesRootErrors}>
      <MultipleChoiceQuestionInstruction />
      <FormTextField
        id={id}
        className="w-[80%]"
        name={`multipleChoiceQuestions.${index}.text`}
        defaultValue={data.question}
      />
      <MultipleChoiceAlternativesGroupContainer>
        {data.alternatives.map((alt, idx) => (
          <MultipleChoiceAlternativeContainer key={idx}>
            <FormSwitchField
              labelOnTop
              name={`multipleChoiceQuestions.${index}.alternatives.${idx}.isCorrect`}
              label="Is correct?"
            />
            <FormTextField
              id={id}
              className="w-[80%]"
              name={`multipleChoiceQuestions.${index}.alternatives.${idx}.text`}
            />
          </MultipleChoiceAlternativeContainer>
        ))}
      </MultipleChoiceAlternativesGroupContainer>
    </MultipleChoiceQuestionContainer>
  );
};
