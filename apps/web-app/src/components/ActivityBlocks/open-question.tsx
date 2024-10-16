import { Text } from "@components/ui/Typography";
import { DomainRules } from "@edu-platform/common/domain/rules";
import { FormTextAreaField } from "@components/ui/Form";
import { z } from "zod";
import { cx } from "@styles/utils";
import { GetStudentOutputByIdResponseBody } from "@edu-platform/common";

export const OpenQuestionInputSchema = z
  .string()
  .min(
    DomainRules.ACTIVITY_BLOCKS.OPEN_QUESTION.MIN_LENGTH_CHARACTERS,
    `Open Question must have at least ${DomainRules.ACTIVITY_BLOCKS.OPEN_QUESTION.MIN_LENGTH_CHARACTERS} characters`
  )
  .max(
    DomainRules.ACTIVITY_BLOCKS.OPEN_QUESTION.MAX_LENGTH_CHARACTERS,
    `Open Question cannot have more than ${DomainRules.ACTIVITY_BLOCKS.OPEN_QUESTION.MAX_LENGTH_CHARACTERS} characters`
  );

const OpenQuestionContainer = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cx("flex flex-col gap-y-2 mt-4 p-4", className)}>
    {children}
  </div>
);

const OpenQuestionInstruction = () => (
  <Text className="font-semibold">
    Answer the following question in your own words
  </Text>
);

type DisplayProps = {
  children: React.ReactNode;
  disabled?: boolean;
  index?: number;
};

export const OpenQuestion = ({ children, disabled, index }: DisplayProps) => {
  return (
    <OpenQuestionContainer>
      <OpenQuestionInstruction />
      <Text>{children}</Text>
      {disabled ? (
        <textarea
          className="resize-none overflow-y-hidden leading-relaxed bg-secondary border"
          rows={3}
        />
      ) : (
        <FormTextAreaField
          name={`openQuestions.${index}.answer`}
          isHeightSelfAdjusting
          textAreaClassName="resize-none overflow-y-hidden leading-relaxed"
          disabled={disabled}
        />
      )}
    </OpenQuestionContainer>
  );
};

type WithReviewProps = {
  children: React.ReactNode;
  blockId: string;
  index: number;
  answers: GetStudentOutputByIdResponseBody["answers"];
  disabled?: boolean;
  role: "student" | "reviewer";
};

export const OpenQuestionWithReview = ({
  children,
  disabled,
  index,
  answers,
  role,
  blockId,
}: WithReviewProps) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center">
      <OpenQuestionContainer className="w-full lg:w-[50%]">
        <Text>{children}</Text>
        <textarea
          className="resize-none overflow-y-hidden leading-relaxed bg-secondary border p-2"
          rows={3}
          defaultValue={answers.find((ans) => ans.blockId === blockId)?.answer}
          disabled
        />
      </OpenQuestionContainer>
      <div className="flex flex-col gap-y-2 mt-4 p-4 w-full lg:w-[50%] h-full">
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

export const OpenQuestionInput = ({ id, text }) => {
  return (
    <OpenQuestionContainer>
      <OpenQuestionInstruction />

      <FormTextAreaField
        id={id}
        name="openQuestion"
        defaultValue={text}
        isHeightSelfAdjusting
        textAreaClassName="resize-none overflow-y-hidden leading-relaxed"
      />
    </OpenQuestionContainer>
  );
};
