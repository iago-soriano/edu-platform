import { alternatives } from "./../../infrastructure/repositories/schema";
import {
  ActivityContentNotFound,
  ActivityNotFound,
  ActivityVersionIsNotDraft,
} from "@edu-platform/common";
import {
  IUseCase,
  UserSelectDTO,
  IActivitiesRepository,
  IStorageService,
  IIdGenerator,
} from "@interfaces";
import { QuestionDTO } from "@dto";
import { MultipleChoiceQuestion, Question, VersionStatus } from "@domain";
import { IGetActivityUseCaseHelper } from "@use-case-middlewares";

type InputParams = {
  questionDto: QuestionDTO;
  user: UserSelectDTO;
  activityId: number;
  versionId: number;
};

type Return = void;

export type ISaveQuestionUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISaveQuestionUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private getActivityHelper: IGetActivityUseCaseHelper
  ) {}

  async execute({ questionDto, user, activityId, versionId }: InputParams) {
    const { version, activity } = await this.getActivityHelper.execute({
      activityId,
      versionId,
      questionId: questionDto.id,
    });

    if (activity.authorId !== user.id) throw new ActivityNotFound();

    if (version.status !== VersionStatus.Draft)
      throw new ActivityVersionIsNotDraft();

    const newQuestion = Question.mapFromDto(questionDto);

    // new question
    if (!questionDto.id) {
      // validate incoming content
      newQuestion.validateAnswer();
      newQuestion.validateQuestionText();

      // persist it
      await this.activitiesRepository.Questions.insert(
        newQuestion.mapToDatabaseDto()
      );

      return;
    }

    // find by id
    const contentDbDto = await this.activitiesRepository.Contents.findById(
      contentDto.id
    );
    if (!contentDbDto) throw new ActivityContentNotFound();

    const existingContent = Content.mapFromDatabaseDto(contentDbDto);

    existingContent.merge(newQuestion);
    existingContent.mergePayload(newQuestion as any); // TODO: make this type work

    await this.activitiesRepository.Contents.update(
      contentDto.id,
      existingContent.mapToDatabaseDto(),
      version.id
    );
  }
}
export default UseCase;
