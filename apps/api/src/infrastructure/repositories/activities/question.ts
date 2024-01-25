import {
  IQuestions,
  QuestionInsertDTO,
  CompleteQuestionInsertDTO,
  AlternativeInsertDTO,
  AlternativeSelectDTO,
} from "@interfaces";
import { db, activityQuestions, alternatives } from "@infrastructure";
import { eq, inArray } from "drizzle-orm";

export class Questions implements IQuestions {
  async insert({
    question,
    alternatives: alternativesDtos,
  }: CompleteQuestionInsertDTO) {
    return db.transaction(async (tx) => {
      const insertedQuestion = (
        await tx
          .insert(activityQuestions)
          .values(question)
          .returning({ id: activityQuestions.id })
      )[0];
      let insertedAlternatives: { id: number }[] = [];
      if (alternativesDtos) {
        insertedAlternatives = await tx
          .insert(alternatives)
          .values(alternativesDtos)
          .returning({ id: alternatives.id });
      }
      return {
        questionId: insertedQuestion.id,
        alternativesIds: insertedAlternatives.map(({ id }) => id),
      };
    });
  }

  async insertAlternative(alternative: AlternativeInsertDTO) {
    return (
      await db
        .insert(alternatives)
        .values(alternative)
        .returning({ alternativeId: alternatives.id })
    )[0];
  }

  async updateQuestion(
    questionId: number,
    question: CompleteQuestionInsertDTO
  ) {
    await db
      .update(activityQuestions)
      .set({ ...question, updatedAt: new Date() })
      .where(eq(activityQuestions.id, questionId));
  }

  async updateAlternative(
    alternativeId: number,
    alternative: AlternativeInsertDTO
  ) {
    await db
      .update(alternatives)
      .set({ ...alternative, updatedAt: new Date() })
      .where(eq(alternatives.id, alternativeId));
  }

  async findById(questionId: number) {
    return (
      await db
        .select()
        .from(activityQuestions)
        .where(eq(activityQuestions.id, questionId))
    )[0];
  }

  async findQuestionAndAlternativesById(questionId: number) {
    const question = (
      await db
        .select()
        .from(activityQuestions)
        .where(eq(activityQuestions.id, questionId))
    )[0];
    const alternativesDtos = await db
      .select()
      .from(alternatives)
      .where(eq(alternatives.questionId, questionId));

    return { question, alternatives: alternativesDtos };
  }

  async delete(questionId: number) {
    await db.transaction(async (tx) => {
      // get ids of all alternatives
      const alternativeIds = (
        await tx
          .select({ id: alternatives.id })
          .from(alternatives)
          .where(eq(activityQuestions.id, questionId))
      ).map(({ id }) => id);
      // delete them all
      await tx
        .delete(alternatives)
        .where(inArray(alternatives.id, alternativeIds));
      // delete question
      await db
        .delete(activityQuestions)
        .where(eq(activityQuestions.id, questionId));
    });
  }
}
