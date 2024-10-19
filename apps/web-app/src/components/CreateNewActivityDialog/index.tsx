"use client";

import { Button } from "@components/ui/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from "@components/ui/Dialog";
import {
  Form,
  FormLabel,
  FormRadioGroupField,
  FormSelectField,
} from "@components/ui/Form";
import { RadioGroup } from "@components/ui/RadioGroup";
import { toast } from "@components/ui/useToast";
import {
  ActivityLevel,
  ActivityTopics,
  ActivityType,
  Languages,
} from "@edu-platform/common/domain/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { captalize, uncaptalize } from "utils/helpers";
import { z } from "zod";
import { generateNewActivity } from "./actions";
import { DialogDescription } from "@radix-ui/react-dialog";

const GenerateActivitySchema = z.object({
  language: z.string(),
  type: z.string(),
  topics: z.string(),
  level: z.string({ message: "Required" }),
});

type GenerateActivityValues = z.infer<typeof GenerateActivitySchema>;

export const CreateNewActivityDialog = () => {
  const setSelectedActivityId = (id: string | null) => {
    const url = new URL(`${window.location.origin}/activities/trending`);

    if (id) url.searchParams.set("selectedActivityId", id);
    window.history.pushState({}, "", url);
  };

  const [open, setOpen] = useState(false);

  const form = useForm<GenerateActivityValues>({
    resolver: zodResolver(GenerateActivitySchema),
  });

  const { handleSubmit, register, reset, watch } = form;

  function handleEnums<T extends Record<string, string | number>>(options: T) {
    let optionsArray = Object.values(options).map((opt) => {
      let option = captalize(opt.toString());

      return {
        label: option,
        value: option,
      };
    });

    return optionsArray;
  }

  const onSubmit = async (values: GenerateActivityValues) => {
    try {
      const generatedActivity = await generateNewActivity({
        language: Languages[uncaptalize(values.language)],
        topics: [ActivityTopics[uncaptalize(values.topics)]],
        type: ActivityType[uncaptalize(values.type)],
        level: ActivityLevel[uncaptalize(values.level)],
      });
      setSelectedActivityId(generatedActivity.id);

      toast({
        title: "Activity generated successfully!",
        variant: "success",
      });
    } catch (e) {
      toast({
        title: "There was an error generating the activity",
        description: e.message,
        variant: "error",
      });
    }
    reset();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        reset();
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="primary">Create New</Button>
      </DialogTrigger>
      <DialogContent className="border-box h-[67vh] my-auto md:w-[80ch] sm:w-full justify-between ">
        <DialogHeader>
          <DialogTitle>Generate a new activity</DialogTitle>
          <DialogDescription className="font-thin">
            AI will generate an activity in a couple of seconds
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6 mt-3" onSubmit={handleSubmit(onSubmit)}>
            {/* <br /> */}
            <FormSelectField
              {...register("language")}
              name="language"
              label="Language"
              options={handleEnums(Languages)}
              placeholder="Choose a language..."
              required
            />

            <FormSelectField
              {...register("type")}
              name="type"
              label="Type"
              options={handleEnums(ActivityType)}
              placeholder="Reading"
              //disabled={true}
              required
            />

            <FormSelectField
              {...register("topics")}
              name="topics"
              label="Topics"
              options={handleEnums(ActivityTopics)}
              placeholder="Choose a topic..."
              required
            />

            <RadioGroup
              className="flex flex-col justify-center gap-2"
              {...register("level")}
            >
              <FormLabel className="font-medium" required>
                Level
              </FormLabel>
              <div className="flex items-start justify-start gap-8 mt-2">
                <FormRadioGroupField
                  name="level"
                  options={handleEnums(ActivityLevel)}
                  required
                />
              </div>
            </RadioGroup>

            <DialogFooter>
              <Button
                className="w-[20%] self-end"
                type="submit"
                // disabled={
                //   !watch("language") ||
                //   !watch("topics") ||
                //   !watch("type") ||
                //   !watch("level")
                // }
              >
                Generate
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
