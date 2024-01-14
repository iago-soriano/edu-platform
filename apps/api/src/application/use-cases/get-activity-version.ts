import { Activity } from "@domain";
import {
  ActivityIsNotDraft,
  ActivityIsNotFound,
  UserNotActivityAuthor,
} from "@edu-platform/common";
import {
  IUseCase,
  UserSelectDTO,
  IActivitiesRepository,
  ActivityContentSelectDTO,
  QuestionSelectDTO,
} from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  activityId: number;
  versionId: number;
};

type Return = {
  title: string;
  description: string;
  status: string;
  topics: string;
  elements: {
    id: number;
    title?: string;
    description?: string;
    type: string;
    content?: string;
    elementType: string;
    question?: string;
    answerKey?: string;
    order: number;
  }[];
};

export type IGetActivityVersionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetActivityVersionUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ user, versionId, activityId }: InputParams) {
    const activity =
      await this.activitiesRepository.findActivityById(activityId);

    const { version, contents, questions } =
      await this.activitiesRepository.findVersionById(versionId);

    const elements = [
      ...contents.map((c) => ({ ...c, elementType: "content" })),
      ...questions.map((c) => ({ ...c, elementType: "question" })),
    ].sort((el1, el2) => el1.order - el2.order);

    if (version.activityId != activityId)
      throw new Error("Activity Id and version Id don't match");

    if (version.status == "Draft" && activity.authorId !== user.id)
      throw new Error("Non-author cannot get draft version");

    return {
      id: version.id,
      title: version.title,
      description: version.description,
      status: version.status,
      topics: version.topics,
      elements,
    };
  }
}

export default UseCase;
