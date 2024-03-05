import { SetStateAction, Dispatch } from "react";
// import { SaveContentMutationType } from "@endpoints";

export type CommmonContentProps = {
  contentId: number;
  order: number;
  onChange: Dispatch<SetStateAction<boolean>>;
  hasChanges: boolean;
  saveContentMutation: any;
};
