import { Question, QuestionTypes } from ".";

export class Alternative {
  public id: number = 0;
  public order: number = 0;
  public text: string = "";
  public comment?: string;
  public isCorrect: boolean = false;
  public questionId: number = 0;
}

export class MultipleChoiceQuestion extends Question {
  constructor() {
    super(QuestionTypes.MultipleChoice);
  }

  validateAnswer() {
    if (!this.answer) return;
  }
}
