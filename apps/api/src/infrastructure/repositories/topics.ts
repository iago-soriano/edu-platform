import { ITopicsRepository } from "@interfaces";
import { db, topics as topicsTable } from "@infrastructure";
import { eq, or } from "drizzle-orm";
import { DatabaseError } from "@edu-platform/common";

export class TopicsRepository implements ITopicsRepository {
  async findAllOrThrow(topicIds: number[]) {
    try {
      const requestedUniqueTopicIds = Array.from(new Set(topicIds));

      const topics = await db
        .select()
        .from(topicsTable)
        .where(
          or(...requestedUniqueTopicIds.map((id) => eq(topicsTable.id, id)))
        );

      if (topics.length < requestedUniqueTopicIds.length) {
        console.error({ topics, topicIds, requestedUniqueTopicIds });
        throw new Error(
          "Alguns tópicos não foram encontrados. Favor, recarregar a página."
        );
      }

      return topics;
    } catch (ex) {
      console.error(ex);
      throw new DatabaseError(ex);
    }
  }

  async getAllTopics() {
    return await db.select().from(topicsTable);
  }
}
