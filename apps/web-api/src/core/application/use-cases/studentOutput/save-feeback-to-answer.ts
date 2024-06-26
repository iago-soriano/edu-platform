import { Question, StudentAnswer, OutputStatus } from "@core/domain/entities";
import { IUseCase } from "@edu-platform/common/platform";
import {
  UserSelectDTO,
  IStudentOutputsRepository,
  IActivitiesRepository,
} from "../../interfaces";

type InputParams = {
  user: UserSelectDTO;
  answer: StudentAnswer;
};

type Return = void;

export type ISaveFeedbackToAnswerUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISaveFeedbackToAnswerUseCase {
  constructor(
    private studentOutputsRepository: IStudentOutputsRepository,
    private activitiesRepository: IActivitiesRepository
  ) {}

  async execute({ user, answer }: InputParams) {
    // const output = await this.studentOutputsRepository.getById(
    //   answer.studentOutput.id!
    // );
    // if (!output) throw new OutputNotFound();
    // if (output.status !== OutputStatus.Draft) {
    //   throw new OutputIsNotDraft();
    // }
    // if (output.user.id !== user.id) {
    //   throw new StudentIsNotOutputAuthor();
    // }
    // const question = await this.activitiesRepository.Questions.findById(
    //   answer.question.id!
    // );
    // if (!question) throw new ActivityQuestionNotFound();
    // await this.studentAnswersRepository.insert({
    //   question,
    //   answer: answer.answer,
    //   studentOutput: output,
    // });
  }
}
export default UseCase;
