import SaveQuestionUseCase, {
  ISaveQuestionUseCase,
} from "./activity/save-question";
import CreateNewActivityUseCase, {
  ICreateNewActivityUseCase,
} from "./activity/create-new-activity";
import PublishDraftUseCase, {
  IPublishDraftUseCase,
} from "./activity/publish-draft";
import UpdateActivityMetadataUseCase, {
  IUpdateActivityMetadataUseCase,
} from "./activity/update-draft-metadata";
import DeleteElementUseCase, {
  IDeleteElementUseCase,
} from "./activity/delete-element";
import SaveContentUseCase, {
  ISaveContentUseCase,
} from "./activity/save-content";
import CreateNewDraftVersionUseCase, {
  ICreateNewDraftVersionUseCase,
} from "./activity/create-new-draft";
import InsertUserInCollectionUseCase, {
  IInsertUserInCollectionUseCase,
} from "./collection/insert-student";
import RemoveStudentFromCollectionUseCase, {
  IRemoveStudentFromCollectionUseCase,
} from "./collection/remove-student";
import CreateStudentOutputUseCase, {
  ICreateStudentOutputUseCase,
} from "./studentOutput/new";
import SaveAnswerUseCase, {
  ISaveAnswerUseCase,
} from "./studentOutput-answer/new";
import UpdateStudentOutputUseCase, {
  IUpdateStudentOutputUseCase,
} from "./studentOutput/update";
import InsertFollowerInCollectionUseCase, {
  IInsertFollowerInCollectionUseCase,
} from "./collection/follow-collection";
import UnfollowCollectionUseCase, {
  IUnfollowCollectionUseCase,
} from "./collection/unfollow-collection";
import UpdateNotificationConfigUseCase, {
  IUpdateNotificationConfigUseCase,
} from "./collection/update-notification-config";
import ImportActivityUseCase, {
  IImportActivityUseCase,
} from "./activity/import-from-public-collection";
import UpdateNotificationUseCase, {
  IUpdateNotificationUseCase,
} from "./notification/update";
import CreateNewCollectionUseCase, {
  ICreateNewCollectionUseCase,
} from "./collection/create-new-collection";
import UpdateCollectionMetadataUseCase, {
  IUpdateCollectionMetadataUseCase,
} from "./collection/update-collection-metadata";

export {
  UpdateNotificationUseCase,
  IUpdateNotificationUseCase,
  SaveQuestionUseCase,
  ISaveQuestionUseCase,
  CreateNewActivityUseCase,
  ICreateNewActivityUseCase,
  UpdateActivityMetadataUseCase,
  IUpdateActivityMetadataUseCase,
  DeleteElementUseCase,
  IDeleteElementUseCase,
  SaveContentUseCase,
  ISaveContentUseCase,
  CreateNewDraftVersionUseCase,
  ICreateNewDraftVersionUseCase,
  InsertUserInCollectionUseCase,
  IInsertUserInCollectionUseCase,
  RemoveStudentFromCollectionUseCase,
  IRemoveStudentFromCollectionUseCase,
  CreateStudentOutputUseCase,
  ICreateStudentOutputUseCase,
  SaveAnswerUseCase,
  ISaveAnswerUseCase,
  UpdateStudentOutputUseCase,
  IUpdateStudentOutputUseCase,
  InsertFollowerInCollectionUseCase,
  IInsertFollowerInCollectionUseCase,
  UnfollowCollectionUseCase,
  IUnfollowCollectionUseCase,
  UpdateNotificationConfigUseCase,
  IUpdateNotificationConfigUseCase,
  ImportActivityUseCase,
  IImportActivityUseCase,
  PublishDraftUseCase,
  IPublishDraftUseCase,
  CreateNewCollectionUseCase,
  ICreateNewCollectionUseCase,
  UpdateCollectionMetadataUseCase,
  IUpdateCollectionMetadataUseCase,
};
