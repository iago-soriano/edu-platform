"use client";

import { Form } from "@components/ui/Form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetStudentOutputByIdResponseBody } from "@edu-platform/common";
import { ActivityBlockType } from "@edu-platform/common/domain/enums";

import { TextBlock } from "@components/ActivityBlocks/text";
import { OpenQuestionDoForm } from "@components/ActivityBlocks/open-question";
import { MultipleChoiceQuestionDoForm } from "@components/ActivityBlocks/multiple-choice-question";
import { Button } from "@components/ui/Button";
import { toast } from "@components/ui/useToast";
import { navigate } from "@components/navigate";

import { updateStudentOutputAnswer } from "./actions";

const AnswerActivitySchema = z.object({
  openQuestions: z
    .object({
      answer: z.string().min(40).max(300),
      blockId: z.string(),
    })
    .array(),
  multipleChoiceQuestions: z
    .object({
      answer: z.coerce
        .string()
        .min(1, { message: "This question requires an answer" })
        .max(1),
      blockId: z.string(),
    })
    .array(),
});

type FormValues = z.infer<typeof AnswerActivitySchema>;

type Props = {
  studentOutput: GetStudentOutputByIdResponseBody;
};
export const StudentOutputDoForm = ({ studentOutput }: Props) => {
  const form = useForm<FormValues>({
    defaultValues: {
      multipleChoiceQuestions: studentOutput?.activityBlocks
        ?.filter((bl) => bl.type === ActivityBlockType.MULTIPLE_CHOICE_QUESTION)
        .map((bl, idx, arr) => {
          return {
            blockId: bl.id,
            answer: "",
          };
        }),
      openQuestions: studentOutput?.activityBlocks
        ?.filter((bl) => bl.type === ActivityBlockType.OPEN_QUESTION)
        .map((bl) => {
          return {
            blockId: bl.id,
            answer: "",
          };
        }),
    },

    resolver: zodResolver(AnswerActivitySchema),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await updateStudentOutputAnswer(studentOutput.id, {
        answers: [...values.multipleChoiceQuestions, ...values.openQuestions],
      });
      toast({
        title: "Activity submitted successfully!",
        description:
          "Your teacher has been notified and will give you feedback shortly",
        variant: "success",
      });
      navigate(`/student-outputs/${studentOutput.id}/review`);
    } catch (e) {
      toast({
        title: "There was an error submitting the activity",
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
        {studentOutput.activityBlocks.map((bl, idx, blocks) => {
          if (bl.type === ActivityBlockType.TEXT)
            return <TextBlock key={bl.id}>{bl.data}</TextBlock>;
          if (bl.type === ActivityBlockType.OPEN_QUESTION) {
            const oqIdx =
              idx -
              (blocks.findIndex(
                (x) => x.type === ActivityBlockType.OPEN_QUESTION
              ) ?? 0);
            return (
              <OpenQuestionDoForm key={bl.id} index={oqIdx}>
                {bl.data}
              </OpenQuestionDoForm>
            );
          }
          if (bl.type === ActivityBlockType.MULTIPLE_CHOICE_QUESTION) {
            const mcqIdx =
              idx -
              (blocks.findIndex(
                (x) => x.type === ActivityBlockType.MULTIPLE_CHOICE_QUESTION
              ) ?? 0);
            return (
              <MultipleChoiceQuestionDoForm
                key={bl.id}
                data={bl.data}
                index={mcqIdx}
              />
            );
          }
        })}
        <Button
          type="submit"
          variant="primary"
          isLoading={form.formState.isSubmitting}
        >
          Save
        </Button>
      </form>
    </Form>
  );
};
