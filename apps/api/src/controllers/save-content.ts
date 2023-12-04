import {
  HTTPController,
  HttpMethod,
  IActivitiesRepository,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  SaveContentRequestBody,
  SaveContentResponseBody,
} from "@edu-platform/common/api";
import {
  IEditContentUseCase,
  ICreateContentUseCase,
  ICreateNewContentFromExistingUseCase,
} from "@use-cases";
import {
  ActivityContentNotFound,
  ActivityIsNotFound,
  ActivityNotFound,
  ActivityVersionNotFound,
} from "@edu-platform/common";

type Request = TypedRequest<
  { activityId; versionId },
  {},
  SaveContentRequestBody
>;
type Response = TypedResponse<SaveContentResponseBody>;

export class SaveContentController implements HTTPController {
  method = HttpMethod.POST;
  path: string = "activity/:activityId/version/:versionId/content";
  middlewares: string[] = ["auth", "file"];

  constructor(
    private createContentUseCase: ICreateContentUseCase,
    private editContentUseCase: IEditContentUseCase,
    private createNewContentFromExistingUseCase: ICreateNewContentFromExistingUseCase,
    private activitiesRepository: IActivitiesRepository
  ) {}

  async execute(req: Request, res: Response) {
    const { title, content, description, type, contentId } = req.body;
    const { activityId, versionId } = req.params;
    const { user, files } = req;

    const validateActivity =
      await this.activitiesRepository.getActivityById(activityId); //rename
    if (!validateActivity) throw new ActivityIsNotFound();

    const validateVersion =
      await this.activitiesRepository.getVersionById(versionId);
    if (!validateVersion) throw new ActivityVersionNotFound(); //rename

    if (contentId) {
      const existingContent =
        await this.activitiesRepository.getActivityContentByContentId(
          contentId
        );
      if (!existingContent) throw new ActivityContentNotFound();

      // This means the content being edited was created in this version
      if (existingContent.originatingVersionId === versionId) {
        await this.editContentUseCase.execute({
          title,
          content,
          description,
          type,
          contentId,
          activityId,
          versionId,
          user,
        });
        res.status(200).json();
      } else {
        const newContentCreated =
          await this.createNewContentFromExistingUseCase.execute({
            title,
            content,
            description,
            type,
            contentId,
            activityId,
            versionId,
            user,
          });
        res.status(200).json(newContentCreated);
      }
    } else {
      const createContent = await this.createContentUseCase.execute({
        title,
        content, // TEXT = stringzona. VIDEO = url do youtube. AUDIO/IMAGE = url do S3
        description,
        type,
        activityId,
        versionId,
        user,
        files,
      });
      res.status(200).json(createContent);
    }
  }
}
