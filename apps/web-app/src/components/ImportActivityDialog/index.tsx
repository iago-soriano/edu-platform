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
import { Text } from "@components/ui/Typography";

import { Divider } from "@components/ui/Divider";
import { getGeneratedActivityById, createNewMyActivity } from "./actions";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { Spinner } from "@components/ui/spinner";

import { GetGeneratedActivityByIdResponseBody } from "@edu-platform/common";
import {
  ActivityBlockType,
  ActivityStatus,
} from "@edu-platform/common/domain/enums";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "@components/ui/useToast";
import { navigate } from "@components/navigate";

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
  const queryClient = useQueryClient();

  const resp = useQuery({
    queryKey: [selectedActivityId],
    queryFn: async () => {
      console.log("fetching...");
      const resp = await getGeneratedActivityById(selectedActivityId ?? "");

      if (resp.activityGenerated.status === ActivityStatus.PENDING) {
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: [selectedActivityId] });
        }, 7500);
      }

      return resp;
    },
    enabled: !!selectedActivityId,
  });

  const form = useForm<EditActivityValues>({
    resolver: zodResolver(EditActivitySchema),
  });
  const { handleSubmit, setValue } = form;

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
    try {
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
      toast({
        title: "Activity imported successfully!",
        variant: "success",
      });
      navigate("/activities/my");
    } catch (e) {
      toast({
        title: "There was an error importing the activity",
        description: e.message,
        variant: "error",
      });
    }
  };

  const parseContent = (
    data: GetGeneratedActivityByIdResponseBody["activityGenerated"]
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
      <DialogContent className="border-box h-[95vh] my-auto md:w-[100ch] sm:w-full justify-between">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 h-full flex flex-col justify-between"
          >
            <DialogHeader className="mb-6">
              <DialogTitle>Edit and Import activity</DialogTitle>
              <DialogDescription>
                Edit this auto-generated activity and share it with students
              </DialogDescription>
            </DialogHeader>
            {resp.isLoading ? (
              <div className="flex flex-col justify-center">
                <Spinner className="w-32 h-32" />
              </div>
            ) : resp.data?.activityGenerated &&
              resp.data.activityGenerated.status === ActivityStatus.READY ? (
              <div>
                <TitleInput />
                {parseContent(resp.data?.activityGenerated)}
              </div>
            ) : (
              <Text>
                Our robots are working on your activity. Please wait a few
                seconds...
              </Text>
            )}

            <DialogFooter //TODO: make it sticky at the bottom
              className="p-2"
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
                  disabled={
                    resp?.data?.activityGenerated.status !==
                    ActivityStatus.READY
                  }
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
