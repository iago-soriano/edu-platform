import * as awilix from "awilix";
import {
  AuthenticationMiddlewareController,
  AcceptFileMiddleware,
} from "@edu-platform/common/platform/http-server/middleware";
import {
  PublishDraftController,
  SaveQuestionController,
  SaveContentController,
  CreateNewDraftVersionController,
  UpdateActivityMetadataController,
  ListCollectionsForOwnerController,
  ListCollectionsForParticipantController,
  DeleteElementController,
  InsertUserInCollectionController,
  RemoveStudentFromCollectionController,
  GetCollectionController,
  ListUsersInCollectionController,
  SaveAnswerController,
  InsertFollowerInCollectionController,
  ImportActivityController,
  CreateNewActivityController,
  ListActivitiesForCollectionParticipantController,
  ListActivitiesForCollectionOwnerController,
  CreateNewCollectionController,
  UpdateCollectionMetadataController,
  GetDraftVersionController,
  GetPublishedVersionController,
  GetArchivedVersionController,
  CreateStudentOutputController,
  PublishStudentOutputController,
  PublishFeedbackController,
  SaveFeedbackToAnswerController,
} from "@core/controllers";
import {
  SaveQuestionUseCase,
  CreateNewActivityUseCase,
  UpdateActivityMetadataUseCase,
  DeleteElementUseCase,
  SaveContentUseCase,
  CreateNewDraftVersionUseCase,
  InsertUserInCollectionUseCase,
  RemoveStudentFromCollectionUseCase,
  InsertFollowerInCollectionUseCase,
  ImportActivityUseCase,
  PublishDraftUseCase,
  UpdateCollectionMetadataUseCase,
  CreateNewCollectionUseCase,
  SaveAnswerUseCase,
  CreateStudentOutputUseCase,
  PublishFeedbackUseCase,
  PublishStudentOutputUseCase,
  SaveFeedbackToAnswerUseCase,
} from "@core/application/use-cases";

export const registerDependencies = (container: awilix.AwilixContainer) => {
  container.register({
    publishDraftController: awilix.asClass(PublishDraftController),
    saveQuestionController: awilix.asClass(SaveQuestionController),
    saveContentController: awilix.asClass(SaveContentController),
    createNewActivityController: awilix.asClass(CreateNewActivityController),
    updateActivityMetadataController: awilix.asClass(
      UpdateActivityMetadataController
    ),
    listActivitiesForCollectionParticipantController: awilix.asClass(
      ListActivitiesForCollectionParticipantController
    ),
    listActivitiesForCollectionOwnerController: awilix.asClass(
      ListActivitiesForCollectionOwnerController
    ),
    deleteElementController: awilix.asClass(DeleteElementController),
    createNewDraftVersionController: awilix.asClass(
      CreateNewDraftVersionController
    ),
    insertUserInCollectionController: awilix.asClass(
      InsertUserInCollectionController
    ),
    removeStudentFromCollectionController: awilix.asClass(
      RemoveStudentFromCollectionController
    ),
    listCollectionsForOwnerController: awilix.asClass(
      ListCollectionsForOwnerController
    ),
    listCollectionsForParticipantController: awilix.asClass(
      ListCollectionsForParticipantController
    ),
    getCollectionController: awilix.asClass(GetCollectionController),
    listUsersInCollectionController: awilix.asClass(
      ListUsersInCollectionController
    ),
    saveAnswerController: awilix.asClass(SaveAnswerController),
    insertFollowerInCollectionController: awilix.asClass(
      InsertFollowerInCollectionController
    ),
    importActivityController: awilix.asClass(ImportActivityController),
    updateCollectionMetadataController: awilix.asClass(
      UpdateCollectionMetadataController
    ),
    createNewCollectionController: awilix.asClass(
      CreateNewCollectionController
    ),
    getDraftVersionController: awilix.asClass(GetDraftVersionController),
    getPublishedVersionController: awilix.asClass(
      GetPublishedVersionController
    ),
    getArchivedVersionController: awilix.asClass(GetArchivedVersionController),
    createStudentOutputController: awilix.asClass(
      CreateStudentOutputController
    ),
    publishStudentOutputController: awilix.asClass(
      PublishStudentOutputController
    ),
    publishFeedbackController: awilix.asClass(PublishFeedbackController),
    saveFeedbackToAnswerController: awilix.asClass(
      SaveFeedbackToAnswerController
    ),

    authMiddleware: awilix
      .asClass(AuthenticationMiddlewareController)
      .classic(),
    fileMiddleware: awilix.asValue(AcceptFileMiddleware), // objeto do multer
    /** #endregion */

    // use cases
    saveQuestionUseCase: awilix.asClass(SaveQuestionUseCase).classic(),
    createNewActivityUseCase: awilix
      .asClass(CreateNewActivityUseCase)
      .classic(),
    updateActivityMetadataUseCase: awilix
      .asClass(UpdateActivityMetadataUseCase)
      .classic(),
    saveContentUseCase: awilix.asClass(SaveContentUseCase).classic(),
    deleteElementUseCase: awilix.asClass(DeleteElementUseCase).classic(),
    createNewDraftVersionUseCase: awilix
      .asClass(CreateNewDraftVersionUseCase)
      .classic(),
    insertUserInCollectionUseCase: awilix
      .asClass(InsertUserInCollectionUseCase)
      .classic(),
    removeStudentFromCollectionUseCase: awilix
      .asClass(RemoveStudentFromCollectionUseCase)
      .classic(),
    saveAnswerUseCase: awilix.asClass(SaveAnswerUseCase).classic(),
    createStudentOutputUseCase: awilix
      .asClass(CreateStudentOutputUseCase)
      .classic(),
    publishFeedbackUseCase: awilix.asClass(PublishFeedbackUseCase).classic(),
    publishStudentOutputUseCase: awilix
      .asClass(PublishStudentOutputUseCase)
      .classic(),
    saveFeedbackToAnswerUseCase: awilix
      .asClass(SaveFeedbackToAnswerUseCase)
      .classic(),
    insertFollowerInCollectionUserCase: awilix
      .asClass(InsertFollowerInCollectionUseCase)
      .classic(),
    importActivityUseCase: awilix.asClass(ImportActivityUseCase).classic(),
    publishDraftUseCase: awilix.asClass(PublishDraftUseCase).classic(),
    insertFollowerInCollectionUseCase: awilix
      .asClass(InsertUserInCollectionUseCase)
      .classic(),
    createNewCollectionUseCase: awilix
      .asClass(CreateNewCollectionUseCase)
      .classic(),
    updateCollectionMetadataUseCase: awilix
      .asClass(UpdateCollectionMetadataUseCase)
      .classic(),
  });
};
