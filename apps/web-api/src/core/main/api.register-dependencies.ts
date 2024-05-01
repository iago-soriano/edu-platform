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
  CreateUserOutputController,
  UpdateStudentOutputController,
  PublishStudentOutputFeedbackController,
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
  UpdateNotificationUseCase,
  SaveFeedbackToAnswerUseCase,
} from "@core/application/use-cases";

export const registerDependencies = (container: awilix.AwilixContainer) => {
  container.register({
    publishDraftController: awilix.asClass(PublishDraftController).classic(),
    saveQuestionController: awilix.asClass(SaveQuestionController).classic(),
    saveContentController: awilix.asClass(SaveContentController).classic(),
    createNewActivityController: awilix.asClass(CreateNewActivityController),
    updateActivityMetadataController: awilix
      .asClass(UpdateActivityMetadataController)
      .classic(),
    listActivitiesForCollectionParticipantController: awilix
      .asClass(ListActivitiesForCollectionParticipantController)
      .classic(),
    listActivitiesForCollectionOwnerController: awilix
      .asClass(ListActivitiesForCollectionOwnerController)
      .classic(),
    deleteElementController: awilix.asClass(DeleteElementController).classic(),
    createNewDraftVersionController: awilix
      .asClass(CreateNewDraftVersionController)
      .classic(),
    insertUserInCollectionController: awilix
      .asClass(InsertUserInCollectionController)
      .classic(),
    removeStudentFromCollectionController: awilix
      .asClass(RemoveStudentFromCollectionController)
      .classic(),
    listCollectionsForOwnerController: awilix
      .asClass(ListCollectionsForOwnerController)
      .classic(),
    listCollectionsForParticipantController: awilix
      .asClass(ListCollectionsForParticipantController)
      .classic(),
    getCollectionController: awilix.asClass(GetCollectionController).classic(),
    listUsersInCollectionController: awilix
      .asClass(ListUsersInCollectionController)
      .classic(),
    saveAnswerController: awilix.asClass(SaveAnswerController).classic(),
    insertFollowerInCollectionController: awilix
      .asClass(InsertFollowerInCollectionController)
      .classic(),
    importActivityController: awilix
      .asClass(ImportActivityController)
      .classic(),
    updateCollectionMetadataController: awilix
      .asClass(UpdateCollectionMetadataController)
      .classic(),
    createNewCollectionController: awilix
      .asClass(CreateNewCollectionController)
      .classic(),
    getDraftVersionController: awilix
      .asClass(GetDraftVersionController)
      .classic(),
    getPublishedVersionController: awilix
      .asClass(GetPublishedVersionController)
      .classic(),
    getArchivedVersionController: awilix
      .asClass(GetArchivedVersionController)
      .classic(),
    createUserOutputController: awilix
      .asClass(CreateUserOutputController)
      .classic(),
    updateStudentOutputController: awilix
      .asClass(UpdateStudentOutputController)
      .classic(),
    publishStudentOutputFeedbackController: awilix
      .asClass(PublishStudentOutputFeedbackController)
      .classic(),
    saveFeedbackToAnswerController: awilix
      .asClass(SaveFeedbackToAnswerController)
      .classic(),

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
    updateStudentOutputUseCase: awilix
      .asClass(UpdateNotificationUseCase)
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
