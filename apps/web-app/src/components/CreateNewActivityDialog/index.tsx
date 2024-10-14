"use client";

import { Button } from "@components/ui/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@components/ui/Dialog";
import { Form, FormTextField } from "@components/ui/Form";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const CreateNewActivityDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary">CREATE NEW</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Create New Activity</DialogHeader>

        <Form>
          <form onSubmit={() => console.log("submit")}>
            <FormTextField name="title" label="Title" placeholder="Title" />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
