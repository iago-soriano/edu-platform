import { Content } from "./base";

export class AudioContent extends Content {
  public constructor(
    public audio: string,
    public title: string,
    public description: string
  ) {
    super(title, description);
  }
}
