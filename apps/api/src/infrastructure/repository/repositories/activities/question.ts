import { IQuestions } from "@interfaces";
import { db, activityQuestions, alternatives } from "@infrastructure";
import { eq, inArray } from "drizzle-orm";
import { Alternative, Question } from "@domain";
import { QuestionDtoMapper, AlternativeDtoMapper } from "../../dto-mappers";

export class Questions implements IQuestions {
  async insert(question: Question) {
    return db.transaction(async (tx) => {
      const insertedQuestion = (
        await tx
          .insert(activityQuestions)
          .values(QuestionDtoMapper.mapToInsertDto(question))
          .returning({ id: activityQuestions.id })
      )[0];
      let insertedAlternatives: { id: number }[] = [];
      if (question.alternatives) {
        insertedAlternatives = await tx
          .insert(alternatives)
          .values(
            question.alternatives.map((alt) =>
              AlternativeDtoMapper.mapToInsertDto(alt)
            )
          )
          .returning({ id: alternatives.id });
      }
      return {
        questionId: insertedQuestion.id,
        alternativesIds: insertedAlternatives.map(({ id }) => id),
      };
    });
  }

  async update(question: Question) {
    //TODO: update updatedAt, like contents
    if (!question.id) throw new Error("There must be an id to update");

    await db
      .update(activityQuestions)
      .set(QuestionDtoMapper.mapToInsertDto(question))
      .where(eq(activityQuestions.id, question.id));
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
    if (question === null) return null;

    question.alternatives = alternativesDtos.map(
      (dto) => AlternativeDtoMapper.mapFromSelectDto(dto) || new Alternative()
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
