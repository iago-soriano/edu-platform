import { SetStateAction, Dispatch } from "react";

export type CommmonContentProps = {
  contentId: number;
  activityId: string;
  onChange: Dispatch<SetStateAction<boolean>>;
  hasChanges: boolean;
  saveContentMutation: any;
};
