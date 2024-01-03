import {
  ActivityContentNotFound,
  ActivityIsNotFound,
  ActivityVersionNotFound,
} from "@edu-platform/common";
import {
  IUseCase,
  UserSelectDTO,
  IActivitiesRepository,
  IStorageService,
  FileType,
  IIdGenerator,
} from "@interfaces";
import { Content } from "@domain";

type InputParams = {
  title: string;
  description: string;
  type: string;
  contentId: number;
  order: number;
  payload: {
    image?: FileType;
    tracks?: string;
    videoUrl?: string;
    text?: string;
  };
  user: UserSelectDTO;
  activityId: number;
  versionId: number;
};

type Return = void;

export type ISaveContentUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISaveContentUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private storageService: IStorageService,
    private idService: IIdGenerator
  ) {}

  async execute({
    contentId,
    title,
    description,
    payload,
    type,
    order,
    user,
    activityId,
    versionId,
  }: InputParams) {
    const activity =
      await this.activitiesRepository.getActivityById(activityId);
    if (!activity) throw new ActivityIsNotFound();

    const version = await this.activitiesRepository.getVersionById(versionId);
    if (!version) throw new ActivityVersionNotFound();

    const newContent = Content.createContent({
      type,
      id: contentId,
      title,
      description,
      imageFile: payload.image,
      tracks: payload.tracks,
      videoUrl: payload.videoUrl,
      text: payload.text,
      order,
      originatingVersionId: versionId,
    });

    // new content
    if (!contentId) {
      const insertedNewContent = await this.activitiesRepository.insertContent({
        ...newContent,
      });
      await this.activitiesRepository.insertRelationBetweenVersionAndElement(
        versionId,
        insertedNewContent.contentId
      );
      return;
    }

    const existingContentFromDB =
      await this.activitiesRepository.getActivityContentByContentId(contentId);
    if (!existingContentFromDB) throw new ActivityContentNotFound();

    const existingContent = Content.createContent(existingContentFromDB); // melhorar

    const imageKeyName = `${activityId}/${this.idService.getId()}.${payload.image?.mimetype.split(
      "/"
    )[1]}`;

    await existingContent.merge(
      versionId,
      newContent,
      () => this.storageService.uploadFile(imageKeyName, payload.image),
      () => this.storageService.deleteFile(imageKeyName)
    );

    if (!existingContent.id) {
      const insertedContentFromExisting =
        await this.activitiesRepository.insertContent(existingContent);
      await this.activitiesRepository.insertRelationBetweenVersionAndElement(
        versionId,
        insertedContentFromExisting.contentId
      );
    } else {
      await this.activitiesRepository.updateContent(
        contentId,
        existingContent,
        versionId
      );
    }
  }
}
export default UseCase;
