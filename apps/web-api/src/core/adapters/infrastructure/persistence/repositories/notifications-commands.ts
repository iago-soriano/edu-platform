import { INotificationsRepository } from "@core/application/interfaces";
import { notifications } from "../schema";
import { and, sql, eq } from "drizzle-orm";
import { db } from "../schema";
import { BaseRepository } from "@edu-platform/common/platform";
import { NotificationSerializer } from "../serializers";
import { AllTables } from "./all-tables";

export const NotificationEntityNames = {
  Notification: AllTables["Notification"],
};

export class NotificationsRepository
  extends BaseRepository<typeof NotificationEntityNames>
  implements INotificationsRepository
{
  constructor() {
    super(NotificationEntityNames, db);
  }

  async findById(id: number) {
    const dto = (
      await db.select().from(notifications).where(eq(notifications.id, id))
    )[0];

    return NotificationSerializer.deserialize(dto);
  }
}
