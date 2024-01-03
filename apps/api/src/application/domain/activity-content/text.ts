import { Content, ContentTypesType } from "./base";

export class TextContent extends Content {
  constructor(
    public type: ContentTypesType,
    public id: number,
    public title: string,
    public description: string,
    public text: string,
    public order: number,
    public originatingVersionId: number,
    public parentId: number
  ) {
    super(type, id, title, description, order, originatingVersionId, parentId);
  }

  merge(versionId: number, content: Partial<Content> & { text?: string }) {
    if (this.originatingVersionId !== versionId) {
      this.id = undefined;
      this.title = content.title;
      this.description = content.description;
      this.text = content.text;
      this.parentId = content.id;
      this.originatingVersionId = versionId;
    } else {
      this.title = content.title;
      this.description = content.description;
      this.text = content.text;
    }
  }
}
