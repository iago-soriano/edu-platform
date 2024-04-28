import { Entity } from "@edu-platform/common/platform";
import { Question, StudentOutput } from "..";

export class StudentAnswer extends Entity {
  public questionId!: number;
  public givenAnswer!: string;
  public studentOutputId!: number;
  public feedbackEmoji!: string;
  public feedbackText!: string;
}
