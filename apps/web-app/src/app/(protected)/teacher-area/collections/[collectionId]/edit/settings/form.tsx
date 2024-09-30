"use client";

import { useState } from "react";
import { Input, RadioGroup, SubmitButton } from "@components";
import doMutation from "./action";
import { GetCollectionByIdResponse } from "@endpoints";
import { useFormStateActionWithToast } from "@infrastructure";

// TODO: not doing client-side validation for now
export const CollectionSettingsForm = ({
  data,
}: {
  data: GetCollectionByIdResponse;
}) => {
  const [isPrivate, setIsPrivate] = useState(data.isPrivate);
  const [state, formAction] = useFormStateActionWithToast(data, doMutation);

  return (
    <form className="flex flex-col items-start" action={formAction}>
      <input type="hidden" value={state.payload.id} name="id" />
      <Input
        name="name"
        placeholder="The name of this collection"
        tamanheza="default"
        variant="ghost"
        defaultValue={state.payload.name}
        inputLabel={{ text: "Name", mandatory: true }}
        error={state.errors?.name}
      />
      <Input
        name="description"
        placeholder="An optional text that describes this collection"
        // className="lg:w-[50%] md:w-[70%] w-[95%] mb-5"
        tamanheza="lg"
        inputLabel={{ text: "Description", mandatory: false }}
        defaultValue={state.payload.description}
        error={state.errors?.description}
      />
      <input type="hidden" value={isPrivate.toString()} name="isPrivate" />
      <label className="mb-10">
        <span className="text-lg">Privacy</span>
        <RadioGroup
          value={isPrivate}
          onChange={(v) => {
            setIsPrivate(v.target.value === "true");
          }}
          options={[
            {
              text: "Private",
              subText: "Only students you chose can see new activities",
              value: true,
            },
            {
              text: "Public",
              subText: "Collection has followers instead of students",
              value: false,
            },
          ]}
        />
      </label>
      {isPrivate && (
        <label className="flex flex-row flex-wrap items-center min-h-11 mb-10">
          <input
            type="checkbox"
            name="notifyOwnerOnStudentOutput"
            defaultChecked={state?.payload.notifyOwnerOnStudentOutput || false}
          />
          <span className="text-lg p-2">E-mail Notifications</span>
          <span className="text-muted-foreground pr-3">
            Get notified whenever a student finishes an activity
          </span>
        </label>
      )}
      <SubmitButton>Save</SubmitButton>
    </form>
  );
};
