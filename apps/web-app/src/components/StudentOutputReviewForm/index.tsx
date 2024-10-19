"use client";

import { Form } from "@components/ui/Form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetStudentOutputByIdResponseBody } from "@edu-platform/common";
import { ActivityBlockType } from "@edu-platform/common/domain/enums";

import { TextBlock } from "@components/ActivityBlocks/text";
import { OpenQuestionWithAnswer } from "@components/ActivityBlocks/open-question";
import { MultipleChoiceQuestionWithAnswer } from "@components/ActivityBlocks/multiple-choice-question";
import { WithReview } from "@components/ActivityBlocks/with-review";

import { Button } from "@components/ui/Button";
import { toast } from "@components/ui/useToast";

import { updateStudentOutputReview } from "./actions";
import { MultipleChoiceQuestion } from "@edu-platform/common/domain/activity-block-schema";

const ReviewStudentOutputSchema = z.object({
  base: z
    .object({
      review: z.string().min(40).max(300),
      blockId: z.string(),
    })
    .array(),
});

type FormValues = z.infer<typeof ReviewStudentOutputSchema>;

type Props = {
  studentOutput: GetStudentOutputByIdResponseBody;
  role: "student" | "reviewer";
  isAnswered: boolean;
  isReviewed: boolean;
};

export const StudentOutputReviewForm = ({
  studentOutput,
  role,
  isAnswered,
  isReviewed,
}: Props) => {
  const form = useForm<FormValues>({
    defaultValues: {
      base: studentOutput?.activityBlocks
        .filter((bl) => bl.type !== ActivityBlockType.TEXT)
        .map((bl, idx, arr) => {
          return {
            blockId: bl.id,
            review: "",
          };
        }),
    },
    resolver: zodResolver(ReviewStudentOutputSchema),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await updateStudentOutputReview(studentOutput.id, {
        reviews: values.base,
      });
      toast({
        title: "Review submitted successfully!",
        description: "Your student has been notified of your review!",
        variant: "success",
      });
    } catch (e) {
      toast({
        title: "There was an error reviewing the activity",
        description: e.message,
        variant: "error",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 h-full flex flex-col justify-between"
      >
        <TextBlock className="w-[90%] md:w-[75ch] lg:w-[100ch]">
          {
            studentOutput.activityBlocks.find(
              (bl) => bl.type === ActivityBlockType.TEXT
            )?.data
          }
        </TextBlock>
        {studentOutput.activityBlocks
          .filter((bl) => bl.type !== ActivityBlockType.TEXT)
          .map((bl, idx, blocks) => {
            if (bl.type === ActivityBlockType.OPEN_QUESTION) {
              return (
                // <OpenQuestionWithReview
                //   key={bl.id}
                //   index={idx}
                //   // data={data}
                //   blockId={bl.id}
                //   answers={studentOutput.answers}
                //   role={role}
                // >
                //   {bl.data}
                // </OpenQuestionWithReview>
                <WithReview
                  role={role}
                  index={idx}
                  review={
                    studentOutput.answers.find((ans) => ans.blockId === bl.id)
                      ?.review
                  }
                  renderQuestion={() => (
                    <OpenQuestionWithAnswer
                      question={bl.data}
                      answer={
                        studentOutput.answers.find(
                          (ans) => ans.blockId === bl.id
                        )?.answer ?? ""
                      }
                    />
                  )}
                />
              );
            }
            if (bl.type === ActivityBlockType.MULTIPLE_CHOICE_QUESTION) {
              const data = bl.data as MultipleChoiceQuestion;
              return (
                <WithReview
                  role={role}
                  index={idx}
                  review={
                    studentOutput.answers.find((ans) => ans.blockId === bl.id)
                      ?.review
                  }
                  renderQuestion={() => (
                    <MultipleChoiceQuestionWithAnswer
                      data={data}
                      givenAnswer={
                        studentOutput.answers.find(
                          (ans) => ans.blockId === bl.id
                        )?.answer
                      }
                    />
                  )}
                />
              );
            }
          })}
        {role === "reviewer" && (
          <Button
            className="ml-auto md:w-40 w-full"
            type="submit"
            variant="primary"
            isLoading={form.formState.isSubmitting}
            disabled={!isAnswered}
          >
            Save Review
          </Button>
        )}
      </form>
    </Form>
  );
};
