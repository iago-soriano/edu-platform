import {
  QuestionRequestDTO,
  SilentInvalidStateError,
} from "@edu-platform/common";
import {
  QuestionTypes,
  Question,
  MultipleChoiceQuestion,
  Alternative,
  TextQuestion,
} from "../elements/question";
import { ActivitElementDescription } from "../elements/value-objects/description";
import { ActivityVersion } from "../version";

export class QuestionAlternativeFactory {
  static fromRequestDto(dtos: QuestionRequestDTO["alternatives"]) {
    if (!dtos) return [];
    return dtos.map((dto) => {
      const alternative = new Alternative();
      alternative.comment = dto.comment;
      alternative.isCorrect = dto.isCorrect || false;
      alternative.text = dto.text || "";
      return alternative;
    });
  }
}
export class QuestionFactory {
  static fromRequestDto(dto: QuestionRequestDTO, version: ActivityVersion) {
    let newQuestion = null;

    switch (dto.type) {
      case QuestionTypes.MultipleChoice:
        newQuestion = new MultipleChoiceQuestion();

        newQuestion.alternatives = QuestionAlternativeFactory.fromRequestDto(
          dto.alternatives
        );

        break;

      case QuestionTypes.Text:
        newQuestion = new TextQuestion();

        newQuestion.answer = dto.answer;
        break;

      default:
        throw new SilentInvalidStateError(
          `Question of type ${dto.type} does not exist`
        );
    }

    newQuestion.description = new ActivitElementDescription(
      dto.description === undefined ? null : dto.description
    );
    newQuestion.question = dto.question;

    newQuestion.versionId = version.id;
    newQuestion.order =
      version.elements.reduce(
        (prev, curr) => (prev.order! > curr.order! ? prev : curr),
        version.elements[0]
      ).order! + 1;

    newQuestion.validateSelf();

    return newQuestion;
  }

  static fromAnotherQuestion(toCopyFrom: Question) {
    let newContent = null;

    // if (toCopyFrom instanceof VideoContent) {
    //   newContent = new VideoContent();

    //   newContent.tracks = toCopyFrom.tracks;
    //   newContent.url = toCopyFrom.url;
    // } else if (toCopyFrom instanceof ImageContent) {
    //   newContent = new ImageContent();

    //   newContent.url = toCopyFrom.url;
    // } else if (toCopyFrom instanceof TextContent) {
    //   newContent = new TextContent();

    //   newContent.text = toCopyFrom.text;
    // }

    // newContent!.description = toCopyFrom.description;
    // newContent!.payload = toCopyFrom.payload;

    return newContent!;
  }
}
