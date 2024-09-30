"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./variants";

export const SubmitButton = ({ children }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="action"
      size="lg"
      isLoading={pending}
      disabled={pending}
    >
      {children}
    </Button>
  );
};
