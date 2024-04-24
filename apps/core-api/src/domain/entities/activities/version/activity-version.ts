import {
  QuestionFactory,
  ContentFactory,
  BaseElement,
  Content,
  Question,
} from "..";
import {
  ActivityVersionTitle,
  ActivityVersionTopics,
  ActivityVersionDescription,
} from "./value-objects";
import { Entity, CollectionArray } from "@edu-platform/common/platform";
import {
  ContentRequestDTO,
  QuestionRequestDTO,
  SilentInvalidStateError,
  InvalidStateError,
} from "@edu-platform/common";
import { VersionStatus } from "./enums";

export { VersionStatus } from "./enums";

const throwVersionValidationError = (message: string) => {
  throw new InvalidStateError(message, { fieldName: "version" });
};

export class ActivityVersion extends Entity {
  // metadata
  public title!: ActivityVersionTitle;
  public description!: ActivityVersionDescription;
  public topics!: ActivityVersionTopics;

  public elements: CollectionArray<BaseElement>;
  public activityId!: string;

  public static MAX_ELEMENT_COUNT = 20;

  constructor(
    public id: string,
    title: string | null,
    description: string | null,
    topics: string | null,
    public version: number,
    public status: VersionStatus
  ) {
    super();
    this.title = new ActivityVersionTitle(title);
    this.description = new ActivityVersionDescription(description);
    this.topics = new ActivityVersionTopics(topics);
    this.elements = new CollectionArray<BaseElement>();
  }

  private _updateTitle(newValue: string) {
    const newTitle = new ActivityVersionTitle(newValue);
    newTitle.validate();
    this.title = newTitle;
  }

  private _updateDescription(newValue: string) {
    const newDescription = new ActivityVersionDescription(newValue);
    newDescription.validate();
    this.description = newDescription;
  }

  private _updateTopics(newValue: string) {
    const newTopics = new ActivityVersionTopics(newValue);
    newTopics.validate();
    this.topics = newTopics;
  }

  public updateMetadata(newValues: {
    title?: string;
    description?: string;
    topics?: string;
  }) {
    if (newValues.title !== undefined) this._updateTitle(newValues.title);
    if (newValues.description !== undefined)
      this._updateDescription(newValues.description);
    if (newValues.topics !== undefined) this._updateTopics(newValues.topics);
  }

  public deleteElement(id: number) {
    const element = this.elements.filter((el) => el.id === Number(id))[0];
    if (!element)
      throw new SilentInvalidStateError(`Element with id ${id} not found`);

    this.elements.markAsDeletedById(element.id!);
  }

  public publish() {
    if (this.status !== VersionStatus.Draft)
      throwVersionValidationError("Can only publish draft versions");
    if (!this.elements.length)
      throwVersionValidationError(
        "There are no contents. You can't publish an empty activity"
      );

    if (this.title.isEmpty() || this.description.isEmpty())
      throwVersionValidationError("Activity must have title and description");

    let elementsToDelete = 0;
    for (let element of this.elements) {
      if (!element.checkValidityForPublication())
        throwVersionValidationError(
          `The element with description ${element.description} is unfinished`
        ); //TODO: return id and scroll on the page

      if (element.isEmpty()) {
        elementsToDelete++;
        this.elements.markAsDeletedById(element.id!);
      }
    }

    if (elementsToDelete === this.elements.length)
      throwVersionValidationError("All elements are empty, cannot publish");

    this.status = VersionStatus.Published;
  }

  public archive() {
    if (this.status !== VersionStatus.Published)
      throwVersionValidationError("Can only archive published versions");

    this.status = VersionStatus.Archived;
  }

  private _canInsertElement() {
    if (this.elements.length === ActivityVersion.MAX_ELEMENT_COUNT) {
      throwVersionValidationError(
        "Maximum number of elements has been reached, cannot add any new elements"
      );
    }
  }

  public async upsertContent(contentDto: ContentRequestDTO) {
    const currentElement = this.elements
      .filter((el) => el.elementType === "Content")
      .filter((cntnt) => cntnt.id === contentDto.id)[0];

    const currentContent = currentElement as Content;

    if (!currentContent && contentDto.id)
      throw new SilentInvalidStateError("Could not find specified content");

    if (currentContent && currentContent.type !== contentDto.type)
      throwVersionValidationError("Cannot change content type after creation");

    if (currentContent)
      return currentContent.update(contentDto, this.activityId, this.id);

    this._canInsertElement();

    const newContent = ContentFactory.fromRequestDto(contentDto, this);
    this.elements.push(newContent);
  }

  public upsertQuestion(questionDto: QuestionRequestDTO) {
    const currentElement = this.elements
      .filter((el) => el.elementType === "Question")
      .filter((cntnt) => cntnt.id === questionDto.id)[0];

    const currentQuestion = currentElement as Question;

    if (!currentQuestion && questionDto.id)
      throw new SilentInvalidStateError("Could not find specified question");

    if (currentQuestion && currentQuestion?.type !== questionDto.type)
      throwVersionValidationError("Cannot change question type after creation");

    if (currentQuestion) return currentQuestion.update(questionDto);

    this._canInsertElement();

    const newQuestion = QuestionFactory.fromRequestDto(questionDto, this);
    this.elements.push(newQuestion);
  }
}
