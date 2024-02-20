import { QuestionTypeNotFound } from "@edu-platform/common";
import { activityQuestions, alternatives } from "@infrastructure";
import {
  Question,
  TextQuestion,
  MultipleChoiceQuestion,
  QuestionTypes,
  Alternative,
  ActivityVersion,
} from "@domain";
import { DomainDtoMapper } from "./types";

export const AlternativeDtoMapper: DomainDtoMapper<
  Alternative,
  typeof alternatives
> = {
  mapFromSelectDto: (dto: typeof alternatives.$inferSelect) => {
    const alternative = new Alternative();

    alternative.id = dto.id || 0;
    alternative.question = new MultipleChoiceQuestion(dto.questionId || 0);
    alternative.isCorrect = dto.isCorrect || false;
    alternative.comment = dto.comment || "";
    alternative.order = dto.order || 0;
    alternative.text = dto.text || "";

    return alternative;
  },
  mapToInsertDto: (domain: Alternative) => {
    return domain;
  },
};

export const QuestionDtoMapper: DomainDtoMapper<
  Question,
  typeof activityQuestions
> = {
  mapFromSelectDto: (questionDto: typeof activityQuestions.$inferSelect) => {
    let newQuestion = null;

    switch (questionDto.type) {
      case QuestionTypes.Text:
        newQuestion = new TextQuestion();
        break;
      case QuestionTypes.MultipleChoice:
        newQuestion = new MultipleChoiceQuestion();
        break;
      default:
        throw new QuestionTypeNotFound();
    }

    newQuestion.question = questionDto.question || "";
    newQuestion.answer = questionDto.answer || "";

    newQuestion.order = questionDto.order || 0;

    newQuestion.id = questionDto.id;
    newQuestion.version = new ActivityVersion(questionDto.versionId!);

    return newQuestion;
  },
  mapToInsertDto: (domain: TextQuestion | MultipleChoiceQuestion) => {
    return {
      id: domain.id,
      question: domain.question,
      answer: domain.answer,
      order: domain.order || 0,
      type: domain.type,
      versionId: domain.version.id,
      alternatives: (domain as MultipleChoiceQuestion)?.alternatives?.map(
        (alt) => AlternativeDtoMapper.mapToInsertDto(alt)
      ),
    };
  },
};
