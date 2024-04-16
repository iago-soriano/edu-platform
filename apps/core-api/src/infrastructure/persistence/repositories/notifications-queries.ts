import { INotificationsReadRepository } from "@application/interfaces";
import { NotificationType } from "@domain/entities";
import { db, notifications } from "../schema";
import { and, sql, eq } from "drizzle-orm";
import { PaginatedParamsDTO } from "@edu-platform/common";

export class NotificationsReadRepository
  implements INotificationsReadRepository
{
  async list({
    userId,
    page,
    pageSize,
  }: { userId: number } & PaginatedParamsDTO) {
    const sq = db.$with("sq").as(
      db
        .select({
          id: notifications.id,
          isNew: notifications.isUnread,
          type: notifications.type,
          message: notifications.message,
          details: notifications.details,
          totalUnread:
            sql<number>`COUNT(CASE WHEN ${notifications.isUnread} = ${true} THEN 1 END)`.as(
              "totalUnread"
            ),
          total: sql<number>`COUNT(DISTINCT ${notifications.id})`.as("total"),
        })
        .from(notifications)
        .where(eq(notifications.userId, userId))
    );

    const dtos = await db
      .with(sq)
      .select()
      .from(sq)
      .limit(pageSize)
      .offset(page * pageSize);

    return {
      data: dtos.map((dto) => ({
        notification: {
          id: dto.id,
          isNew: dto.isNew,
          type: dto.type as NotificationType,
          message: dto.message,
          details: dto.details,
        },
        totalUnread: dto.totalUnread,
      })),

      pagination: {
        totalCount: dtos[0]?.total,
      },
    };
  }
}
