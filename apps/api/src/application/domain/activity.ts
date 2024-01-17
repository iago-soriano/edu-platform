import { ActivitySelectDTO } from "@interfaces";

export class Activity {
  constructor(
    public id: number,
    public authorId: number,
    public lastVersionId: number,
    public draftVersionId: number
  ) {}

  hasPublishedVersion() {
    return !!this.lastVersionId;
  }

  hasDraft() {
    return !!this.draftVersionId;
  }

  static mapFromDatabaseDto(dto: ActivitySelectDTO) {
    return new Activity(
      dto.id || 0,
      dto.authorId || 0,
      dto.lastVersionId || 0,
      dto.draftVersionId || 0
    );
  }
}
