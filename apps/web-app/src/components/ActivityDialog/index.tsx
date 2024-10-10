"use client";

import { TextBlock } from "@components/ActivityBlocks/text";
import { BlockTitle } from "@components/ActivityBlocks/title";
import { Button } from "@components/ui/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/ui/Dialog";
import { useState } from "react";

export const ActivityDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">Activity</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Activity</DialogHeader>

        <BlockTitle />
        <TextBlock />
      </DialogContent>
    </Dialog>
  );
};
