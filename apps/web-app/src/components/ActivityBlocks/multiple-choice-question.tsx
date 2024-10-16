import { Text } from "@components/ui/Typography";
import { MultipleChoiceQuestion as ResponseMultipleChoiceQuestionType } from "@edu-platform/common/domain/activity-block-schema";
import {
  FormField,
  FormSwitchField,
  FormTextField,
  FormRadioGroupField,
  FormTextAreaField,
} from "@components/ui/Form";
import { z } from "zod";
import { DomainRules } from "@edu-platform/common/domain/rules";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "@components/ui/RadioGroup";
import { useFormContext } from "react-hook-form";
import { cx, hasErrorInput } from "@styles/utils";
import { GetStudentOutputByIdResponseBody } from "@edu-platform/common";

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

const MultipleChoiceAlternativeContainer = ({ children }) => (
  <div className="flex flex-row gap-x-2 ml-2">{children}</div>
);

const MultipleChoiceAlternativesGroupContainer = ({ children }) => (
  <div className="flex flex-col gap-y-2 ">{children}</div>
);

type ContainerProps = {
  error?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const MultipleChoiceQuestionContainer = ({
  children,
  error,
  className,
}: ContainerProps) => (
  <div
    className={cx(
      "flex flex-col gap-y-2 mt-4 p-4",
      !!error ? hasErrorInput : "",
      className
    )}
  >
    {children}
    <Text className="text-sm font-medium text-destructive">{error ?? ""}</Text>
  </div>
);

const MultipleChoiceQuestionInstruction = () => (
  <Text className="font-semibold">Choose the correct alternative</Text>
);

type AnswerProps = {
  data: ResponseMultipleChoiceQuestionType;
  disabled?: boolean;
  index?: number;
};

export const MultipleChoiceQuestion = ({ data, index }: AnswerProps) => {
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

type DisplayProps = {
  data: ResponseMultipleChoiceQuestionType;
  disabled?: boolean;
  givenAnswer?: string;
};

export const MultipleChoiceQuestionDisplay = ({
  data,
  disabled,
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
                disabled={disabled}
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

type WithReviewProps = {
  data: ResponseMultipleChoiceQuestionType;
  answers: GetStudentOutputByIdResponseBody["answers"];
  disabled?: boolean;
  index?: number;
  role: "student" | "reviewer";
  blockId: string;
};

export const MultipleChoiceQuestionWithReview = ({
  data,
  role,
  disabled,
  index,
  answers,
  blockId,
}: WithReviewProps) => {
  // console.log(data);
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center">
      <div className="w-full lg:w-[50%]">
        <MultipleChoiceQuestionDisplay
          data={data}
          givenAnswer={answers.find((ans) => ans.blockId === blockId)?.answer}
          disabled={disabled}
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 p-4 w-full lg:w-[50%]">
        {role === "reviewer" ? (
          <>
            <Text className="font-semibold">
              Provide some feedback on the answer
            </Text>
            <FormTextAreaField
              name={`base.${index}.review`}
              isHeightSelfAdjusting
              textAreaClassName="resize-none overflow-y-hidden leading-relaxed"
              disabled={disabled}
              defaultValue={
                answers.find((ans) => ans.blockId === blockId)?.review
              }
            />
          </>
        ) : (
          <Text className="text-center font-light">
            {answers.find((ans) => ans.blockId === blockId)?.review ||
              "No review has been given to this answer"}
          </Text>
        )}
      </div>
    </div>
  );
};
