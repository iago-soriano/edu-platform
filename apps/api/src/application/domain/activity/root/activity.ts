import { Collection, VersionFactory } from "@domain";
import { ActivityVersion, BaseElement, VersionStatus } from "..";
import { IIdGenerator } from "@interfaces";
import { ContentRequestDTO } from "@edu-platform/common";
import {
  Entity,
  CollectionArray,
  PersistancePropertyName,
} from "../../abstract";

export class Activity extends Entity {
  constructor(id?: string) {
    super();
    this.id = id || "";
  }

  public id!: string;
  public authorId!: number;
  public collectionId!: number;
  @PersistancePropertyName("lastVersionId")
  public lastVersion: ActivityVersion | null = null;
  @PersistancePropertyName("draftVersionId")
  public draftVersion: ActivityVersion | null = null;
  public archivedVersions: ActivityVersion[] = [];

  updateCurrentDraftMetadata(
    newValues: { title?: string; description?: string; topics?: string },
    user: { id: number }
  ) {
    if (!this.draftVersion)
      throw new Error("There is currently no draft to update");

    if (this.authorId !== user.id) throw new Error("Activity not found");

    this.draftVersion.updateMetadata(newValues);
  }

  static createNewInCollection(
    collection: Collection,
    user: { id: number },
    idService: IIdGenerator
  ) {
    if (collection.ownerId !== user.id)
      throw new Error("You cannot add activities to this collection");

    const activity = new Activity();
    activity.id = idService.getId();
    activity.collectionId = collection.id as number;
    activity.authorId = user.id;

    const version = new ActivityVersion(
      idService.getId(),
      null,
      null,
      null,
      1,
      VersionStatus.Draft
    );
    version.activityId = activity.id;

    activity.draftVersion = version;

    return activity;
  }

  createNewDraftFromPublished(user: { id: number }, idService: IIdGenerator) {
    if (this.authorId !== user.id)
      throw new Error("You are not allowed to change this activity");
    if (!this.lastVersion)
      throw new Error(
        "There is no currently published version to create a draft from"
      );

    if (this.draftVersion) return;

    const newDraft = VersionFactory.fromAnotherVersionWithElements(
      this.lastVersion,
      idService.getId()
    );
    newDraft.activityId = this.id;

    this.draftVersion = newDraft;
  }

  public deleteElementOfDraft(user: { id: number }, id: number) {
    if (!this.draftVersion) throw new Error("There is no draft version");
    if (this.authorId !== user.id)
      throw new Error("You are not allowed to change this activity");

    return this.draftVersion.deleteElement(id);
  }

  public publishCurrentDraft(user: { id: number }) {
    if (!this.draftVersion)
      throw new Error("There is currently no draft to publish");
    if (this.authorId !== user.id)
      throw new Error("You are not allowed to change this activity");

    if (this.lastVersion) {
      this.lastVersion.archive();
      this.archivedVersions.push(this.lastVersion);
    }

    this.draftVersion.publish();
    this.lastVersion = this.draftVersion;
    this.draftVersion = null;
  }

  public upsertContent(user: { id: number }, contentDto: ContentRequestDTO) {
    if (this.authorId !== user.id)
      throw new Error("You are not allowed to change this activity");

    if (!this.draftVersion)
      throw new Error("There is currently no draft to insert contents in");

    this.draftVersion.upsertContent(contentDto);
  }
}
