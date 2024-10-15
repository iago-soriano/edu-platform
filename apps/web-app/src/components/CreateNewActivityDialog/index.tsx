"use client";

import { Button } from "@components/ui/Button";
import { Checkbox } from "@components/ui/Checkbox";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@components/ui/Dialog";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormSelectField,
  FormTextField,
} from "@components/ui/Form";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "@components/ui/RadioGroup";
import {
  ActivityTopics,
  ActivityType,
  Languages,
} from "@edu-platform/common/domain/enums";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const CreateNewActivityDialog = () => {
  const [open, setOpen] = useState(false);

  const form = useForm();

  function handleEnums<T extends Record<string, string | number>>(options: T) {
    let optionsArray = Object.values(options).map((opt) => {
      return {
        label: opt as string,
        value: opt as string,
      };
    });

    return optionsArray;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary">CREATE NEW</Button>
      </DialogTrigger>
      <DialogContent className="border-box h-[95vh] my-auto md:w-[100ch] sm:w-full justify-between">
        <Form {...form}>
          <form className="space-y-6">
            <DialogHeader>Create New Activity</DialogHeader>
            <FormSelectField
              name="language"
              label="Language"
              options={handleEnums(Languages)}
              required
            />
            <FormSelectField
              name="topics"
              label="Topics"
              options={handleEnums(ActivityTopics)}
              required
            />
            <FormSelectField
              name="type"
              label="Type"
              options={handleEnums(ActivityType)}
              placeholder="Reading"
              disabled={true}
              required
            />
            <RadioGroup className="flex flex-row items-center w-full justify-between">
              <div>
                <RadioGroupItem value="BASIC" id="BASIC">
                  <RadioGroupIndicator />
                </RadioGroupItem>
                <label htmlFor="BASIC">Basic</label>
              </div>
              <div>
                <RadioGroupItem value="INTERMEDIATE" id="INTERMEDIATE">
                  <RadioGroupIndicator />
                </RadioGroupItem>
                <label htmlFor="INTERMEDIATE">Intermediate</label>
              </div>
              <div>
                <RadioGroupItem value="ADVANCED" id="ADVANCED">
                  <RadioGroupIndicator />
                </RadioGroupItem>
                <label htmlFor="BASIC">Advanced</label>
              </div>{" "}
            </RadioGroup>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
