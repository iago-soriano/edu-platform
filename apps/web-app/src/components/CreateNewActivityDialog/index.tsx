"use client";

import { Button } from "@components/ui/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@components/ui/Dialog";
import { useState } from "react";

export const CreateNewActivityDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">CREATE NEW</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Create New Activity</DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
