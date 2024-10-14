"use client";

import { TextInputSchema, TextInput } from "@components/ActivityBlocks/text";
import { TitleInputSchema, TitleInput } from "@components/ActivityBlocks/title";

import {
  OpenQuestionInput,
  OpenQuestionInputSchema,
} from "@components/ActivityBlocks/open-question";
import {
  MultipleChoiceQuestionInput,
  MultipleChoiceQuestionInputSchema,
} from "@components/ActivityBlocks/multiple-choice-question";

import { Form } from "@components/ui/Form";
import { Button } from "@components/ui/Button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@components/ui/Dialog";
import { Divider } from "@components/ui/Divider";
import { listGeneratedActivities, createNewMyActivity } from "./actions";

import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { Spinner } from "@components/ui/spinner";

import { GetActivityByIdResponseBody } from "@edu-platform/common";
import { ActivityBlockType } from "@edu-platform/common/domain/enums";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const EditActivitySchema = z.object({
  title: TitleInputSchema,
  text: TextInputSchema,
  openQuestion: OpenQuestionInputSchema,
  multipleChoiceQuestions: MultipleChoiceQuestionInputSchema,
});

type EditActivityValues = z.infer<typeof EditActivitySchema>;

type ActivityDialogProps = {
  setOpen: Dispatch<SetStateAction<string | null>>;
  selectedActivityId: string | null;
};

export const ImportActivityDialog = ({
  setOpen,
  selectedActivityId,
}: ActivityDialogProps) => {
  const resp = useQuery({
    queryKey: [selectedActivityId],
    queryFn: () => listGeneratedActivities(selectedActivityId ?? ""),
    enabled: !!selectedActivityId,
  });

  const form = useForm<EditActivityValues>({
    // TODO
    // resolver: (...args) => {
    //   console.log(args);
    //   return zodResolver(EditActivitySchema)(...args);
    // },
  });
  const {
    // control,
    handleSubmit,
    // formState: { isSubmitting, errors },
    setValue,
  } = form;

  console.log(form.formState.errors);

  useEffect(() => {
    if (!resp?.data?.activityGenerated) return;

    resp.data?.activityGenerated.activityBlocks.forEach((bl, idx, blocks) => {
      if (bl.type === ActivityBlockType.TEXT) setValue("text", bl.data);
      else if (bl.type === ActivityBlockType.OPEN_QUESTION)
        setValue("openQuestion", bl.data);
      else if (bl.type === ActivityBlockType.MULTIPLE_CHOICE_QUESTION) {
        const mcqIdx =
          idx -
          (blocks.findIndex(
            (x) => x.type === ActivityBlockType.MULTIPLE_CHOICE_QUESTION
          ) ?? 0);
        // console.log("setting", idx, bl.data);
        setValue(`multipleChoiceQuestions.${mcqIdx}.text`, bl.data.question);
        (bl.data.alternatives as string[]).forEach((alt: string, j) => {
          setValue(
            `multipleChoiceQuestions.${mcqIdx}.alternatives.${j}.text`,
            alt
          );
          setValue(
            `multipleChoiceQuestions.${mcqIdx}.alternatives.${j}.isCorrect`,
            bl.data.correctAnswer === j
          );
        });
      }
    });
  }, [resp.data?.activityGenerated]);

  const onSubmit = async (values: EditActivityValues) => {
    console.log({ values });
    await createNewMyActivity({
      title: values.title ?? "No title",
      blocks: [
        { data: values.text, type: ActivityBlockType.TEXT },
        { data: values.openQuestion, type: ActivityBlockType.OPEN_QUESTION },
        ...values.multipleChoiceQuestions.map((mcq) => ({
          data: JSON.stringify({
            question: mcq.text,
            alternatives: mcq.alternatives.map((x) => x.text),
            correctAnswer: mcq.alternatives.findIndex((x) => x.isCorrect),
          }),
          type: ActivityBlockType.MULTIPLE_CHOICE_QUESTION,
        })),
      ],
      generatedActivityId: selectedActivityId ?? "",
    });
  };

  const parseContent = (
    data: GetActivityByIdResponseBody["activityGenerated"]
  ) => {
    // console.log(data.activityBlocks);
    return data.activityBlocks.map((bl, idx, blocks) => {
      if (bl.type === ActivityBlockType.TEXT)
        return <TextInput key={bl.id} id={bl.id} text={bl.data} />;
      if (bl.type === ActivityBlockType.OPEN_QUESTION)
        return <OpenQuestionInput key={bl.id} id={bl.id} text={bl.data} />;
      if (bl.type === ActivityBlockType.MULTIPLE_CHOICE_QUESTION) {
        const mcqIdx =
          idx -
          (blocks.findIndex(
            (x) => x.type === ActivityBlockType.MULTIPLE_CHOICE_QUESTION
          ) ?? 0);
        return (
          <MultipleChoiceQuestionInput
            key={bl.id}
            id={bl.id}
            data={bl.data}
            index={mcqIdx}
          />
        );
      }
    });
  };

  return (
    <Dialog
      open={!!selectedActivityId}
      onOpenChange={(open) => setOpen(open ? (selectedActivityId ?? "") : null)}
    >
      <DialogContent className="border-box h-[100vh] min-w-[75ch] max-w-[100ch] justify-between">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader className="mb-6">
              <DialogTitle>Edit and Import activity</DialogTitle>
              <DialogDescription>
                Edit this auto-generated activity and share it with students
              </DialogDescription>
            </DialogHeader>
            {resp.isLoading ? (
              <Spinner className=" w-32 h-32" />
            ) : (
              resp.data?.activityGenerated && (
                <div>
                  <TitleInput />
                  {parseContent(resp.data?.activityGenerated)}
                </div>
              )
            )}

            <DialogFooter
            //className="h-[40px]"
            >
              <Divider />
              <div className="flex flex-row justify-end">
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={form.formState.isSubmitting}
                >
                  Save
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
