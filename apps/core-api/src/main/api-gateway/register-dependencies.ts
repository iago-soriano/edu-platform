import * as awilix from "awilix";
import {
  PublishDraftController,
  SaveQuestionController,
  SaveContentController,
  CreateNewDraftVersionController,
  UpdateActivityMetadataController,
  GetActivityVersionController,
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
} from "@controllers";
import {
  SaveQuestionUseCase,
  CreateNewActivityUseCase,
  UpdateActivityMetadataUseCase,
  DeleteElementUseCase,
  SaveContentUseCase,
  CreateNewDraftVersionUseCase,
  InsertUserInCollectionUseCase,
  RemoveStudentFromCollectionUseCase,
  SaveAnswerUseCase,
  InsertFollowerInCollectionUseCase,
  ImportActivityUseCase,
  PublishDraftUseCase,
} from "@application/use-cases";

export const registerDependencies = (container: awilix.AwilixContainer) => {
  container.register({
    publishDraftController: awilix.asClass(PublishDraftController).classic(),
    saveQuestionController: awilix.asClass(SaveQuestionController).classic(),
    saveContentController: awilix.asClass(SaveContentController).classic(),
    createNewActivityController: awilix
      .asClass(CreateNewActivityController)
      .classic(),
    updateActivityMetadataController: awilix
      .asClass(UpdateActivityMetadataController)
      .classic(),
    getActivityVersionController: awilix
      .asClass(GetActivityVersionController)
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
    insertFollowerInCollectionUserCase: awilix
      .asClass(InsertFollowerInCollectionUseCase)
      .classic(),
    importActivityUseCase: awilix.asClass(ImportActivityUseCase).classic(),
    publishDraftUseCase: awilix.asClass(PublishDraftUseCase).classic(),
    insertFollowerInCollectionUseCase: awilix
      .asClass(InsertUserInCollectionUseCase)
      .classic(),
  });
};
