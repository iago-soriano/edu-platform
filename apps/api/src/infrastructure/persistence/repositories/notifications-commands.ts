import { INotificationsRepository } from "@application/interfaces";
import { notifications } from "../schema";
import { and, sql, eq } from "drizzle-orm";
import { db } from "../schema";
import { BaseRepository, AllTablesIndexer } from "./base-repository";
import { NotificationSerializer } from "../serializers";

export const NotificationEntityNames: AllTablesIndexer[] = ["Notification"];

export class NotificationsRepository
  extends BaseRepository
  implements INotificationsRepository
{
  constructor() {
    super(NotificationEntityNames);
  }

  async findById(id: number) {
    const dto = (
      await db.select().from(notifications).where(eq(notifications.id, id))
    )[0];

    super.initializeEventTracking(id, this._events);

    return NotificationSerializer.deserialize(dto, this._events);
  }
}
