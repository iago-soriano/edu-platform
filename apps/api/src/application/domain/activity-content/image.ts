import { Content } from "./base";

export class ImageContent extends Content {
  public constructor(
    public image: string,
    public title: string,
    public description: string
  ) {
    super(title, description);
  }
}
