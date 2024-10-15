"use client";

import { TextBlock } from "@components/ActivityBlocks/text";
import { Title } from "@components/ActivityBlocks/title";

import { OpenQuestion } from "@components/ActivityBlocks/open-question";
import { MultipleChoiceQuestion } from "@components/ActivityBlocks/multiple-choice-question";

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
import { getMydActivityById, createNewStudentOutput } from "./actions";

import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormSelectField,
  FormTextField,
} from "@components/ui/Form";

import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { Spinner } from "@components/ui/spinner";
import { z } from "zod";

import { GetMyActivityByIdResponseBody } from "@edu-platform/common";
import { ActivityBlockType } from "@edu-platform/common/domain/enums";

import { useEffect } from "react";
import { toast } from "@components/ui/useToast";
import { navigate } from "@components/navigate";

import { useForm } from "react-hook-form";

const ShareActivityFormSchema = z.object({
  email: z.string().email(),
});

type FormValues = z.infer<typeof ShareActivityFormSchema>;

type DialogProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedActivityId: string | null;
  isOpen: boolean;
};

export const RequestStudentEmailDialog = ({
  setOpen,
  selectedActivityId,
  isOpen,
}: DialogProps) => {
  const form = useForm();

  const onSubmit = async (values: FormValues) => {
    try {
      await createNewStudentOutput({
        studentEmail: values.email,
        activityId: selectedActivityId ?? "",
      });
      toast({
        title: "Activity shred successfully!",
        description: "You will be notified when your student finishes",
        variant: "success",
      });
      setOpen(false);
    } catch (e) {
      toast({
        title: "There was an error sharing the activity",
        description: e.message,
        variant: "error",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="border-box my-auto md:w-[70ch] sm:w-[90%] justify-between">
        <DialogHeader className="mb-6">
          <DialogTitle>Share activity</DialogTitle>
          <DialogDescription>
            Share this activity with a student, they will receive it by e-mail
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 h-full flex flex-col justify-between"
          >
            <FormTextField
              className=""
              placeholder="Type student e-mail here..."
              name={"email"}
            />
            <DialogFooter
            //className="fixed bottom-0"
            >
              <Divider />
              <div className="flex flex-row justify-end">
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button type="submit" variant="primary">
                  Share
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
