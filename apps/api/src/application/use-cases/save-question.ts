import {
  ITopicsRepository,
  IActivitiesRepository,
} from "./../../interfaces/repositories";
import { IUseCase, UserSelectDTO } from "@interfaces";

type InputParams = {
  text: string;
  answerKey: string;
  type: number[];
  questionId?: number;
  user: UserSelectDTO;
};

type Return = {
  questionId?: number;
};

export type ISaveQuestionUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISaveQuestionUseCase {
  constructor(
    private topicsRepository: ITopicsRepository,
    private activitiesRepository: IActivitiesRepository
  ) {}

  async execute({
    text,
    answerKey,
    type,
    questionId: requestActivityId,
    user,
  }: InputParams) {
    return { questionId: 2 };
  }
}

export default UseCase;
