import {
  ActivityQuestionNotFound,
  ActivityNotFound,
  ActivityVersionIsNotDraft,
  ActivityVersionNotFound,
} from "@edu-platform/common";
import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";
import { MultipleChoiceQuestion, Question, VersionStatus } from "@domain";

type InputParams = {
  question: Question;
  user: UserSelectDTO;
  versionId: number;
};

type Return = void;

export type ISaveQuestionUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISaveQuestionUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ question, user, versionId }: InputParams) {
    const version =
      await this.activitiesRepository.Versions.findFullViewById(versionId);
    if (!version) throw new ActivityVersionNotFound();

    if (version.activity.author.id !== user.id) throw new ActivityNotFound();

    if (version.status !== VersionStatus.Draft)
      throw new ActivityVersionIsNotDraft();

    // new question
    if (!question.id) {
      // validate incoming content
      question.validateAnswer();
      question.validateQuestionText();

      // persist it
      await this.activitiesRepository.Questions.insert(question);

      return;
    }

    // find by id
    const existingQuestion = await this.activitiesRepository.Questions.findById(
      question.id
    );
    if (!existingQuestion) throw new ActivityQuestionNotFound();

    existingQuestion.merge(question);

    await this.activitiesRepository.Questions.update(existingQuestion);
  }
}
export default UseCase;
