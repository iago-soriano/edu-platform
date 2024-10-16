"use client";
import { useState } from "react";

import { TextBlock } from "@components/ActivityBlocks/text";
import { Title } from "@components/ActivityBlocks/title";

import { OpenQuestion } from "@components/ActivityBlocks/open-question";
import { MultipleChoiceQuestionDisplay } from "@components/ActivityBlocks/multiple-choice-question";

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

import { useMutation, useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { Spinner } from "@components/ui/spinner";

import { GetMyActivityByIdResponseBody } from "@edu-platform/common";
import { ActivityBlockType } from "@edu-platform/common/domain/enums";

import { RequestStudentEmailDialog } from "./RequestStudentEmailDialog";
import { LoadingErrorData } from "@components/ui/ErrorLoadingData";

type ActivityDialogProps = {
  setOpen: Dispatch<SetStateAction<string | null>>;
  selectedActivityId: string | null;
};

export const MyActivityDialog = ({
  setOpen,
  selectedActivityId,
}: ActivityDialogProps) => {
  const resp = useQuery({
    queryKey: [selectedActivityId],
    queryFn: () => getMydActivityById(selectedActivityId ?? ""),
    enabled: !!selectedActivityId,
  });

  const [isRequestStudentEmailDialogOpen, setIsRequestStudentEmailDialogOpen] =
    useState(false);

  const parseContent = (data: GetMyActivityByIdResponseBody["activity"]) => {
    // console.log(data.activityBlocks);
    return data.activityBlocks.map((bl, idx, blocks) => {
      if (bl.type === ActivityBlockType.TEXT)
        return <TextBlock key={bl.id}>{bl.data}</TextBlock>;
      if (bl.type === ActivityBlockType.OPEN_QUESTION)
        return (
          <OpenQuestion key={bl.id} disabled>
            {bl.data}{" "}
          </OpenQuestion>
        );
      if (bl.type === ActivityBlockType.MULTIPLE_CHOICE_QUESTION) {
        return (
          <MultipleChoiceQuestionDisplay key={bl.id} data={bl.data} disabled />
        );
      }
    });
  };

  console.log(resp);
  return (
    <>
      <RequestStudentEmailDialog
        setOpen={setIsRequestStudentEmailDialogOpen}
        isOpen={isRequestStudentEmailDialogOpen}
        selectedActivityId={selectedActivityId}
      />
      <Dialog
        open={!!selectedActivityId}
        onOpenChange={(open) =>
          setOpen(open ? (selectedActivityId ?? "") : null)
        }
      >
        <DialogContent className="border-box h-[95vh] my-auto md:w-[100ch] sm:w-full justify-between">
          <DialogHeader className="mb-6">
            <DialogTitle>Share activity</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <LoadingErrorData
            loading={resp.isLoading}
            error={resp.error}
            hasData={!!resp.data?.activity}
            data={
              <div>
                <Title>{resp.data?.activity?.title}</Title>
                {resp.data?.activity && parseContent(resp.data?.activity!)}
              </div>
            }
          />

          <DialogFooter
          //className="fixed bottom-0"
          >
            <Divider />
            <div className="flex flex-row justify-end">
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                variant="primary"
                onClick={() => {
                  setIsRequestStudentEmailDialogOpen(true);
                }}
              >
                Share
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
