import { Question, QuestionTypes } from ".";
import { ActivityVersion } from "../version";

export class Alternative {
  public id: number = 0;
  public order: number = 0;
  public text: string = "";
  public comment?: string;
  public isCorrect: boolean = false;
  public question: MultipleChoiceQuestion = new MultipleChoiceQuestion();
}

export class MultipleChoiceQuestion extends Question {
  constructor() {
    super(QuestionTypes.MultipleChoice);
  }

  validateAnswer() {
    if (!this.answer) return;
  }
}
