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
  SaveContentRequestParams,
} from "@edu-platform/common/api";
import {
  IEditContentUseCase,
  ICreateContentUseCase,
  ICreateNewContentFromExistingUseCase,
} from "@use-cases";
import {
  ActivityContentNotFound,
  ActivityIsNotFound,
  ActivityVersionNotFound,
} from "@edu-platform/common";

type Request = TypedRequest<
  SaveContentRequestParams,
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
    const { title, content, description, type, contentId, order, start, end } =
      req.body;
    const { activityId: actvIdStr, versionId: vrsnIdStr } = req.params;
    const activityId = parseInt(actvIdStr);
    const versionId = parseInt(vrsnIdStr);

    const { user, files } = req;

    const activity =
      await this.activitiesRepository.getActivityById(activityId);
    if (!activity) throw new ActivityIsNotFound();

    const version = await this.activitiesRepository.getVersionById(versionId);
    if (!version) throw new ActivityVersionNotFound();

    if (contentId) {
      const existingContent =
        await this.activitiesRepository.getActivityContentByContentId(
          contentId
        );
      if (!existingContent) throw new ActivityContentNotFound();

      // This means the content being edited was created in this version
      if (existingContent.originatingVersionId == versionId) {
        await this.editContentUseCase.execute({
          title,
          content,
          description,
          contentId,
          activityId,
          versionId,
          user,
          start,
          end,
          files,
        });
        res.status(200).json();
      } else {
        await this.createNewContentFromExistingUseCase.execute({
          title,
          content,
          description,
          contentId,
          activityId,
          versionId,
          user,
          files,
          existingContent,
        });
        res.status(200).json();
      }
    } else {
      const createContent = await this.createContentUseCase.execute({
        title,
        content,
        description,
        type,
        activityId,
        versionId,
        order,
        files,
      });
      res.status(200).json(createContent);
    }
  }
}
