import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { errorToast, successToast } from "@components";

export const useFormStateActionWithToast = (
  data,
  doMutation
): [
  {
    payload: any;
    success: boolean;
    message: string;
    hasSubmitted: boolean;
    errors: any;
  },
  (args: any) => any,
] => {
  const [state, formAction] = useFormState(doMutation, {
    payload: data,
    success: true,
    message: "",
    hasSubmitted: false,
    errors: null,
  });

  useEffect(() => {
    if (!state.hasSubmitted) return;
    if (!state?.success) errorToast(state.message);
    else successToast("Collection updated successfully");
  }, [state]);

  return [state, formAction];
};
