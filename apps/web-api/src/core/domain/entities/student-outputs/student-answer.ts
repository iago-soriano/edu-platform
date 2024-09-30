import {
  DomainRules,
  InvalidStateError,
  QuestionTypes,
  SilentInvalidStateError,
} from "@edu-platform/common";
import { Entity } from "@edu-platform/common/platform";

export class StudentAnswer extends Entity {
  public id: number;
  public answer: string;
  public feedbackEmoji?: string;
  public feedbackText?: string;
  public questionId!: number;
  public studentOutputId!: number;

  constructor(
    id?: number,
    feedbackEmoji?: string,
    feedbackText?: string,
    answer?: string
  ) {
    super();
    this.id = id || 0;
    this.feedbackEmoji = feedbackEmoji || "";
    this.feedbackText = feedbackText || "";
    this.answer = answer || "";
  }

  public updateFeedback(feedbackEmoji?: string, feedbackText?: string) {
    if (
      this.feedbackText &&
      this.feedbackText.length > DomainRules.FEEDBACK.MAX_LENGTH
    )
      throw new InvalidStateError(
        `Text is too long. Max length allowed is ${DomainRules.FEEDBACK.MAX_LENGTH} characters`
      );

    const regexEmojiPresentation = /\p{Emoji_Presentation}/gu;

    if (this.feedbackEmoji && !this.feedbackEmoji.match(regexEmojiPresentation))
      throw new InvalidStateError(`Invalid emoji`);

    this.feedbackEmoji = feedbackEmoji;
    this.feedbackText = feedbackText;
  }

  public updateAnswer(newAnswer: string, questionType: string) {
    if (questionType === QuestionTypes.MultipleChoice && newAnswer.length !== 1)
      throw new SilentInvalidStateError("Answer should be single a character");

    if (questionType === QuestionTypes.Text) {
      if (newAnswer.length < DomainRules.ANSWER.MIN_LENGTH) {
        throw new InvalidStateError(
          `Text is too short. Min length allowed is ${DomainRules.ANSWER.MIN_LENGTH} characters`
        );
      } else if (newAnswer.length > DomainRules.ANSWER.MAX_LENGTH) {
        throw new InvalidStateError(
          `Text is too long. Max length allowed is ${DomainRules.ANSWER.MAX_LENGTH} characters`
        );
      }
    }
    this.answer = newAnswer;
  }
}
