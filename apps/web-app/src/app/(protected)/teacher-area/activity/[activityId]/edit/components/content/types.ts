import { SetStateAction, Dispatch } from "react";

export type CommmonContentProps = {
  contentId: number;
  onChange: Dispatch<SetStateAction<boolean>>;
  hasChanges: boolean;
  saveContentMutation: any;
};
