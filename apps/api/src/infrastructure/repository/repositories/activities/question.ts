import { IQuestions } from "@interfaces";
import { db, activityQuestions, alternatives } from "@infrastructure";
import { eq, inArray } from "drizzle-orm";
import { Question } from "@domain";
import { QuestionDtoMapper, AlternativeDtoMapper } from "../../dto-mappers";

export class Questions implements IQuestions {
  async insert({ alternatives: alternativesDtos, ...question }: Question) {
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

  async update(questionId: number, question: Question) {
    await db
      .update(activityQuestions)
      .set({ ...question, updatedAt: new Date() })
      .where(eq(activityQuestions.id, questionId));
  }

  async findById(questionId: number) {
    const questionDto = (
      await db
        .select()
        .from(activityQuestions)
        .where(eq(activityQuestions.id, questionId))
    )[0];
    const alternativesDtos = await db
      .select()
      .from(alternatives)
      .where(eq(alternatives.questionId, questionId));

    const question = QuestionDtoMapper.mapFromSelectDto(questionDto);
    question.alternatives = alternativesDtos.map((dto) =>
      AlternativeDtoMapper.mapFromSelectDto(dto)
    );

    return question;
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
