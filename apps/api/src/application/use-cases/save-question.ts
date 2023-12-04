import { QuestionTypeNotFound } from "@edu-platform/common";
import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";
import { Question } from "application/domain/question";

type InputParams = {
  text: string;
  answerKey: string;
  type: string;
  //choices?: [] -> Como declarar o array de choices
  questionId?: number;
  user: UserSelectDTO;
};

type Return = {
  questionId?: number;
};

export type ISaveQuestionUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISaveQuestionUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({
    text,
    answerKey,
    type,
    questionId: requestActivityId,
    user,
  }: InputParams) {
    const typeOfQuestion = Question.validateQuestionType(type);

    switch (typeOfQuestion) {
      case "Multiplechoice":
        break;
      case "Text":
        break;
      default:
        throw new QuestionTypeNotFound();
    }
    return { questionId: 2 };
  }
}

export default UseCase;
