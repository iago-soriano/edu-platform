import { ActivityPublishedEvent } from "../domain-events";
import { ActivityVersion, BaseElement, VersionStatus } from "..";
import {
  DomainServicesRegistry,
  IDomainServiceRegistry,
} from "../../../domain-services";
import { ContentRequestDTO, QuestionRequestDTO } from "@edu-platform/common";
import {
  Entity,
  CollectionArray,
  PersistancePropertyName,
} from "../../abstract";

export class Activity extends Entity {
  constructor() {
    super();
    this._domainServiceRegistry = new DomainServicesRegistry();
  }

  public id!: string;
  public authorId!: number;
  public collectionId!: number;
  @PersistancePropertyName("lastVersionId")
  public lastVersion: ActivityVersion | null = null;
  @PersistancePropertyName("draftVersionId")
  public draftVersion: ActivityVersion | null = null;
  public archivedVersions: ActivityVersion[] = [];

  private _domainServiceRegistry: IDomainServiceRegistry;

  public updateCurrentDraftMetadata(
    newValues: { title?: string; description?: string; topics?: string },
    user: { id: number }
  ) {
    if (!this.draftVersion)
      throw new Error("There is currently no draft to update");

    if (this.authorId !== user.id) throw new Error("Activity not found");

    this.draftVersion.updateMetadata(newValues);
  }

  public setDraftVersion(newVersion: ActivityVersion | null) {
    if (newVersion) newVersion.activityId = this.id;
    this.draftVersion = newVersion;
  }

  public setLastVersion(newVersion: ActivityVersion | null) {
    if (newVersion) newVersion.activityId = this.id;
    this.lastVersion = newVersion;
  }

  public throwIfCantCreateNewDraft(user: { id: number }) {
    if (this.authorId !== user.id)
      throw new Error("You are not allowed to change this activity");
    if (!this.lastVersion)
      throw new Error(
        "There is no currently published version to create a draft from"
      );

    if (this.draftVersion) throw new Error("There is already a draft");
  }

  public deleteElementOfDraft(user: { id: number }, id: number) {
    if (!this.draftVersion) throw new Error("There is no draft version");
    if (this.authorId !== user.id)
      throw new Error("You are not allowed to change this activity");

    return this.draftVersion.deleteElement(id);
  }

  public async publishCurrentDraft(user: { id: number }) {
    if (!this.draftVersion)
      throw new Error("There is currently no draft to publish");
    if (this.authorId !== user.id)
      throw new Error("You are not allowed to change this activity");

    if (this.lastVersion) {
      this.lastVersion.archive();
      this.archivedVersions.push(this.lastVersion);
    }

    this.draftVersion.publish();

    this.setLastVersion(this.draftVersion);
    this.setDraftVersion(null);

    await this._domainServiceRegistry.publishDomainEvent(
      new ActivityPublishedEvent({ activity: this })
    );
  }

  _canUpsertElement(user: { id: number }) {
    if (this.authorId !== user.id)
      throw new Error("You are not allowed to change this activity");

    if (!this.draftVersion)
      throw new Error("There is currently no draft to insert elements in");
  }

  public upsertContent(user: { id: number }, contentDto: ContentRequestDTO) {
    this._canUpsertElement(user);

    this.draftVersion!.upsertContent(contentDto);
  }

  public upsertQuestion(user: { id: number }, questionDto: QuestionRequestDTO) {
    this._canUpsertElement(user);

    this.draftVersion!.upsertQuestion(questionDto);
  }
}
