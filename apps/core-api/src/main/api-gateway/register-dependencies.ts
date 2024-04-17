import * as awilix from "awilix";
import {
  // SignInController,
  // SignOutController,
  // SignUpController,
  // ProviderSignUpController,
  // VerifyAccountController,
  // ChangePasswordRequestController,
  // ChangePasswordController,
  // RefreshTokenController,

  PublishDraftController,
  SaveQuestionController,
  SaveContentController,
  CreateNewDraftVersionController,
  UpdateActivityMetadataController,
  GetActivityVersionController,
  ListCollectionsForOwnerController,
  ListCollectionsForParticipantController,
  DeleteElementController,
  SaveCollectionController,
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
  SignInUseCase,
  SignOutUseCase,
  SignUpUseCase,
  ProviderSignUpUseCase,
  VerifyAccountUseCase,
  ChangePasswordRequestUseCase,
  ChangePasswordUseCase,
  SaveQuestionUseCase,
  CreateNewActivityUseCase,
  UpdateActivityMetadataUseCase,
  DeleteElementUseCase,
  RefreshTokenUseCase,
  SaveContentUseCase,
  CreateNewDraftVersionUseCase,
  SaveCollectionUseCase,
  InsertUserInCollectionUseCase,
  RemoveStudentFromCollectionUseCase,
  SaveAnswerUseCase,
  InsertFollowerInCollectionUseCase,
  ImportActivityUseCase,
  PublishDraftUseCase,
} from "@application/use-cases";

export const registerDependencies = (container: awilix.AwilixContainer) => {
  container.register({
    /** #region controllers */
    // signInController: awilix.asClass(SignInController).classic(),
    // signOutController: awilix.asClass(SignOutController).classic(),
    // signUpController: awilix.asClass(SignUpController).classic(),
    // providerSignUpController: awilix
    //   .asClass(ProviderSignUpController)
    //   .classic(),
    // verifyAccountController: awilix.asClass(VerifyAccountController).classic(),
    // changePasswordRequestController: awilix
    //   .asClass(ChangePasswordRequestController)
    //   .classic(),
    // changePasswordController: awilix
    //   .asClass(ChangePasswordController)
    //   .classic(),
    // refreshTokenController: awilix.asClass(RefreshTokenController).classic(),

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
    saveCollectionController: awilix
      .asClass(SaveCollectionController)
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
    signInUseCase: awilix.asClass(SignInUseCase).classic(),
    signOutUseCase: awilix.asClass(SignOutUseCase).classic(),
    signUpUseCase: awilix.asClass(SignUpUseCase).classic(),
    providerSignUpUseCase: awilix.asClass(ProviderSignUpUseCase).classic(),
    verifyAccountUseCase: awilix.asClass(VerifyAccountUseCase).classic(),
    changePasswordRequestUseCase: awilix
      .asClass(ChangePasswordRequestUseCase)
      .classic(),
    changePasswordUseCase: awilix.asClass(ChangePasswordUseCase).classic(),
    saveQuestionUseCase: awilix.asClass(SaveQuestionUseCase).classic(),
    createNewActivityUseCase: awilix
      .asClass(CreateNewActivityUseCase)
      .classic(),
    updateActivityMetadataUseCase: awilix
      .asClass(UpdateActivityMetadataUseCase)
      .classic(),
    saveContentUseCase: awilix.asClass(SaveContentUseCase).classic(),
    deleteElementUseCase: awilix.asClass(DeleteElementUseCase).classic(),
    refreshTokenUseCase: awilix.asClass(RefreshTokenUseCase).classic(),
    createNewDraftVersionUseCase: awilix
      .asClass(CreateNewDraftVersionUseCase)
      .classic(),
    saveCollectionUseCase: awilix.asClass(SaveCollectionUseCase).classic(),
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
