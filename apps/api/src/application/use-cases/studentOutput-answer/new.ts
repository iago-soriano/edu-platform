import { Question, StudentAnswer, OutputStatus } from "@domain/entities";
import {
  IUseCase,
  UserSelectDTO,
  IStudentOutputsRepository,
  IActivitiesRepository,
} from "@application/interfaces";

type InputParams = {
  user: UserSelectDTO;
  answer: StudentAnswer;
};

type Return = void;

export type ISaveAnswerUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISaveAnswerUseCase {
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
