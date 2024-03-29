import { ListCollectionsByUserController } from "../controllers/collection/list-by-user";
import { CreateNewActivityController } from "../controllers/activity/new";
import * as awilix from "awilix";
import {
  SignInController,
  SignOutController,
  SignUpController,
  ProviderSignUpController,
  VerifyAccountController,
  ChangePasswordRequestController,
  ChangePasswordController,
  CheckChangePasswordTokenRequestController,
  UpdateVersionStatusController,
  SaveQuestionController,
  SaveContentController,
  CreateNewDraftVersionController,
  UpdateActivityMetadataController,
  GetActivityVersionController,
  ListActivityVersionsController,
  DeleteContentController,
  DeleteQuestionController,
  DeleteVersionController,
  RefreshTokenController,
  SaveCollectionController,
  InsertUserInCollectionController,
  RemoveStudentFromCollectionController,
  GetCollectionController,
  ListUsersInCollectionController,
  SaveAnswerController,
  UpdateNotificationController,
  InsertFollowerInCollectionController,
  ImportActivityController,
} from "@controllers";
import {
  SignInUseCase,
  SignOutUseCase,
  SignUpUseCase,
  ProviderSignUpUseCase,
  VerifyAccountUseCase,
  ChangePasswordRequestUseCase,
  ChangePasswordUseCase,
  CheckChangePasswordTokenRequestUseCase,
  UpdateActivityStatusUseCase,
  SaveQuestionUseCase,
  CreateNewActivityUseCase,
  UpdateActivityMetadataUseCase,
  DeleteContentUseCase,
  DeleteQuestionUseCase,
  DeleteVersionUseCase,
  RefreshTokenUseCase,
  SaveContentUseCase,
  CreateNewDraftVersionUseCase,
  SaveCollectionUseCase,
  InsertUserInCollectionUseCase,
  RemoveStudentFromCollectionUseCase,
  GetCollectionUseCase,
  InsertDefaultCollectionUseCase,
  SaveAnswerUseCase,
  UpdateNotificationUseCase,
  InsertFollowerInCollectionUseCase,
  ImportActivityUseCase,
} from "@use-cases";
import {
  BCryptEncryptionService,
  EmailService,
  JWTTokenService,
  IdGeneratorService,
  UserRepository,
  TokenRepository,
  AssetRepository,
  ActivityRepository,
  S3Service,
  CollectionsRepository,
  CollectionParticipationsRepository,
  StudentOutputsRepository,
  StudentAnswersRepository,
  ActivityReadRepository,
  CollectionsReadRepository,
  CollectionParticipationsReadRepository,
  NotificationsRepository,
  NotificationsReadRepository,
} from "@infrastructure";
import { ListNotificationsController } from "controllers/notification/list";

export const registerDependencies = (container: awilix.AwilixContainer) => {
  container.register({
    /** #region controllers */
    signInController: awilix.asClass(SignInController).classic(),
    signOutController: awilix.asClass(SignOutController).classic(),
    signUpController: awilix.asClass(SignUpController).classic(),
    providerSignUpController: awilix
      .asClass(ProviderSignUpController)
      .classic(),
    verifyAccountController: awilix.asClass(VerifyAccountController).classic(),
    changePasswordRequestController: awilix
      .asClass(ChangePasswordRequestController)
      .classic(),
    changePasswordController: awilix
      .asClass(ChangePasswordController)
      .classic(),
    checkChangePasswordTokenRequestController: awilix
      .asClass(CheckChangePasswordTokenRequestController)
      .classic(),
    updateActivityStatusController: awilix
      .asClass(UpdateVersionStatusController)
      .classic(),
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
    listActivityVersionsController: awilix
      .asClass(ListActivityVersionsController)
      .classic(),
    deleteContentController: awilix.asClass(DeleteContentController).classic(),
    deleteQuestionController: awilix
      .asClass(DeleteQuestionController)
      .classic(),
    refreshTokenController: awilix.asClass(RefreshTokenController).classic(),
    deleteVersionController: awilix.asClass(DeleteVersionController).classic(),
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
    listCollectionsByUserController: awilix
      .asClass(ListCollectionsByUserController)
      .classic(),
    getCollectionController: awilix.asClass(GetCollectionController).classic(),
    listUsersInCollectionController: awilix
      .asClass(ListUsersInCollectionController)
      .classic(),
    saveAnswerController: awilix.asClass(SaveAnswerController).classic(),
    listNotificationsController: awilix
      .asClass(ListNotificationsController)
      .classic(),
    updateNotificationsController: awilix
      .asClass(UpdateNotificationController)
      .classic(),
    insertFollowerInCollectionController: awilix
      .asClass(InsertFollowerInCollectionController)
      .classic(),
    importActivityController: awilix
      .asClass(ImportActivityController)
      .classic(),

    /** #endregion */

    // services
    encryptionService: awilix.asClass(BCryptEncryptionService),
    emailService: awilix.asClass(EmailService),
    idService: awilix.asClass(IdGeneratorService),
    tokenService: awilix.asClass(JWTTokenService).singleton(),
    assetRepository: awilix.asClass(AssetRepository),
    storageService: awilix.asClass(S3Service),

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
    checkChangePasswordTokenRequestUseCase: awilix
      .asClass(CheckChangePasswordTokenRequestUseCase)
      .classic(),
    updateActivityStatusUseCase: awilix
      .asClass(UpdateActivityStatusUseCase)
      .classic(),
    saveQuestionUseCase: awilix.asClass(SaveQuestionUseCase).classic(),
    createNewActivityUseCase: awilix
      .asClass(CreateNewActivityUseCase)
      .classic(),
    updateActivityMetadataUseCase: awilix
      .asClass(UpdateActivityMetadataUseCase)
      .classic(),
    saveContentUseCase: awilix.asClass(SaveContentUseCase).classic(),
    deleteVersionUseCase: awilix.asClass(DeleteVersionUseCase).classic(),
    deleteContentUseCase: awilix.asClass(DeleteContentUseCase).classic(),
    deleteQuestionUseCase: awilix.asClass(DeleteQuestionUseCase).classic(),
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
    getCollectionUseCase: awilix.asClass(GetCollectionUseCase).classic(),
    insertDefaultCollectionUseCase: awilix
      .asClass(InsertDefaultCollectionUseCase)
      .classic(),
    saveAnswerUseCase: awilix.asClass(SaveAnswerUseCase).classic(),
    updateNotificationUseCase: awilix
      .asClass(UpdateNotificationUseCase)
      .classic(),
    insertFollowerInCollectionUserCase: awilix
      .asClass(InsertFollowerInCollectionUseCase)
      .classic(),
    importActivityUseCase: awilix.asClass(ImportActivityUseCase).classic(),

    // repositories
    userRepository: awilix.asClass(UserRepository).classic(),
    tokenRepository: awilix.asClass(TokenRepository).classic(),
    activitiesRepository: awilix.asClass(ActivityRepository).classic(),
    activitiesReadRepository: awilix.asClass(ActivityReadRepository).classic(),
    collectionsRepository: awilix.asClass(CollectionsRepository).classic(),
    collectionsReadRepository: awilix
      .asClass(CollectionsReadRepository)
      .classic(),
    collectionParticipationsRepository: awilix
      .asClass(CollectionParticipationsRepository)
      .classic(),
    collectionParticipationsReadRepository: awilix
      .asClass(CollectionParticipationsReadRepository)
      .classic(),
    studentOutputsRepository: awilix
      .asClass(StudentOutputsRepository)
      .classic(),
    studentAnswersRepository: awilix
      .asClass(StudentAnswersRepository)
      .classic(),
    notificationsRepository: awilix.asClass(NotificationsRepository).classic(),
    notificationsReadRepository: awilix
      .asClass(NotificationsReadRepository)
      .classic(),
    insertFollowerInCollectionUseCase: awilix
      .asClass(InsertUserInCollectionUseCase)
      .classic(),
  });
};
