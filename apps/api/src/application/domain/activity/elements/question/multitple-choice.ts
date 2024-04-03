import { Question, QuestionTypes } from ".";

export class Alternative {
  public id: number = 0;
  public createdAt?: Date;
  public updatedAt?: Date;

  public order: number = 0;
  public text: string = "";
  public comment?: string;
  public isCorrect: boolean = false;
  public question: MultipleChoiceQuestion = new MultipleChoiceQuestion(0);
}

export class MultipleChoiceQuestion extends Question {
  constructor(public id: number) {
    super(QuestionTypes.MultipleChoice);
  }

  validateAnswer() {
    if (!this.answer) return;
  }

  public copy() {}
}
