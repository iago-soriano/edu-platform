import { QuestionTypeNotFound } from "@edu-platform/common";
import {
  activityQuestions,
  alternatives,
  activityVersions,
} from "@infrastructure";
import {
  Question,
  TextQuestion,
  MultipleChoiceQuestion,
  QuestionTypes,
  Alternative,
  ActivityVersion,
} from "@domain";
import { DomainDtoMapper } from "./types";
import { VersionDtoMapper } from ".";

export const AlternativeDtoMapper = {
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

export const QuestionDtoMapper = {
  mapFromSelectDto: (
    questionDto: typeof activityQuestions.$inferSelect,
    versionDto?: typeof activityVersions.$inferSelect
  ) => {
    let newQuestion = null;

    switch (questionDto.type) {
      case QuestionTypes.Text:
        newQuestion = new TextQuestion(questionDto.id);
        break;
      case QuestionTypes.MultipleChoice:
        newQuestion = new MultipleChoiceQuestion(questionDto.id);
        break;
      default:
        throw new QuestionTypeNotFound();
    }

    newQuestion.question = questionDto.question || "";
    newQuestion.answer = questionDto.answer || "";

    newQuestion.order = questionDto.order || 0;

    newQuestion.version = versionDto
      ? VersionDtoMapper.mapFromSelectDto({
          ...versionDto,
        })
      : new ActivityVersion(questionDto.versionId || 0);

    return newQuestion;
  },
  mapToInsertDto: (domain: Question) => {
    return {
      id: domain.id,
      updatedAt: new Date(),
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
