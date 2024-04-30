import { ActivityPublishedEvent } from "@edu-platform/common/domain/integration-events";
import { IDomainServiceRegistry } from "../../../services";
import { resolveDomainServicesRegistry } from "../../../services/resolve";
import {
  ContentRequestDTO,
  InvalidStateError,
  QuestionRequestDTO,
  SilentInvalidStateError,
} from "@edu-platform/common";
import { Entity, PersistancePropertyName } from "@edu-platform/common/platform";

import { ActivityVersion, ActivitiesFactory } from "..";

export class Activity extends Entity {
  private _domainServiceRegistry: IDomainServiceRegistry;

  constructor() {
    super();
    this._domainServiceRegistry = resolveDomainServicesRegistry();
  }

  public id!: string;
  public authorId!: string;
  public collectionId!: number;
  @PersistancePropertyName("lastVersionId")
  public lastVersion: ActivityVersion | null = null;
  @PersistancePropertyName("draftVersionId")
  public draftVersion: ActivityVersion | null = null;
  public archivedVersions: ActivityVersion[] = [];

  public updateCurrentDraftMetadata(
    newValues: { title?: string; description?: string; topics?: string },
    user: { id: string }
  ) {
    if (!this.draftVersion)
      throw new SilentInvalidStateError(
        "There is currently no draft to update"
      );

    if (this.authorId !== user.id)
      throw new SilentInvalidStateError("User is not activity author");

    this.draftVersion.updateMetadata(newValues);
  }

  public setDraftVersion(newVersion: ActivityVersion | null) {
    if (newVersion) newVersion.activityId = this.id;
    this.draftVersion = newVersion;
  }

  private _setLastVersion(newVersion: ActivityVersion | null) {
    if (newVersion) newVersion.activityId = this.id;
    this.lastVersion = newVersion;
  }

  public createNewDraft(user: { id: string }) {
    if (this.authorId !== user.id)
      throw new SilentInvalidStateError("User is not activity author");
    if (!this.lastVersion)
      throw new SilentInvalidStateError(
        "There is no currently published version to create a draft from"
      );

    if (this.draftVersion)
      throw new SilentInvalidStateError("There is already a draft");

    this.setDraftVersion(
      ActivitiesFactory.Versions.withElementsFrom(this.lastVersion!)
    );
  }

  public deleteElementOfDraft(user: { id: string }, id: number) {
    if (!this.draftVersion)
      throw new SilentInvalidStateError("There is no draft version");
    if (this.authorId !== user.id)
      throw new SilentInvalidStateError("User is not activity author");

    return this.draftVersion!.deleteElement(id);
  }

  public async publishCurrentDraft(user: { id: string }) {
    if (!this.draftVersion)
      throw new SilentInvalidStateError(
        "There is currently no draft to publish"
      );
    if (this.authorId !== user.id)
      throw new SilentInvalidStateError("User is not activity author");

    if (this.lastVersion) {
      this.lastVersion.archive();
      this.archivedVersions.push(this.lastVersion);
    }

    this.draftVersion!.publish();

    this._setLastVersion(this.draftVersion);
    this.setDraftVersion(null);

    await this._domainServiceRegistry.publishToDomainTopic(
      new ActivityPublishedEvent({ activityId: this.id })
    );
  }

  _canUpsertElement(user: { id: string }) {
    if (this.authorId !== user.id)
      throw new SilentInvalidStateError("User is not activity author");

    if (!this.draftVersion)
      throw new SilentInvalidStateError(
        "There is currently no draft to insert elements in"
      );
  }

  public upsertContent(user: { id: string }, contentDto: ContentRequestDTO) {
    this._canUpsertElement(user);

    return this.draftVersion!.upsertContent(contentDto);
  }

  public upsertQuestion(user: { id: string }, questionDto: QuestionRequestDTO) {
    this._canUpsertElement(user);

    this.draftVersion!.upsertQuestion(questionDto);
  }
}
