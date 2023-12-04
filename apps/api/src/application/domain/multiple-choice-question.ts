import {
  AudioContentIsTooLarge,
  AudioContentIsTooSmall,
  CommentIsTooLarge,
  CommentIsTooSmall,
  DomainRules,
} from "@edu-platform/common";

import { Question } from "./question";

export class MultipleChoiceQuestion extends Question {
  static MultipleChoice(choices: string[]) {
    if (choices.length > DomainRules.CONTENT.AUDIO.MAX_LENGTH) {
      throw new AudioContentIsTooLarge();
    } else if (choices.length < DomainRules.CONTENT.AUDIO.MIN_LENGTH) {
      throw new AudioContentIsTooSmall();
    }
  }

  static validateCommentLength(comment: string) {
    if (comment.length > DomainRules.QUESTION.COMMENT.MAX_LENGTH) {
      throw new CommentIsTooLarge();
    } else if (comment.length < DomainRules.QUESTION.COMMENT.MIN_LENGTH) {
      throw new CommentIsTooSmall();
    }
  }

  static validateAnswerKey(answerKey: string) {
    if (answerKey.length !== 1) {
      throw new Error(`A resposta deve conter apenas 1 caracter`);
    }
  }

  static validateMultipleChoiceQuestion(
    audio: string,
    title: string,
    comment: string
  ) {
    Question.validateTitle(title);
    MultipleChoiceQuestion.validateCommentLength(comment);
    MultipleChoiceQuestion.MultipleChoice(audio);
  }
}
