import { SetStateAction, Dispatch } from "react";
import { SaveContentMutationType } from "@endpoints";

export type CommmonContentProps = {
  title: string;
  description: string;
  contentId: number;
  onChange: Dispatch<SetStateAction<boolean>>;
  hasChanges: boolean;
  saveContentMutation: SaveContentMutationType;
};
