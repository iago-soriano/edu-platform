import { IUserRepository } from "application/interfaces";
import { db, users } from "../schema";
import { eq } from "drizzle-orm";
import { AllTables } from "./all-tables";
import { BaseRepository } from "@edu-platform/common/platform";
import { User } from "@domain/entities";
import {
  ChangeEventsTree,
  ChangeTrackingProxy,
  CollectionArray,
} from "@edu-platform/common/platform";

export const EntityNames = {
  User: AllTables["User"],
};

export class UserRepository
  extends BaseRepository<typeof EntityNames>
  implements IUserRepository
{
  constructor() {
    super(EntityNames, db);
  }
  async getByEmail(email: string) {
    const dto = (
      await db.select().from(users).where(eq(users.email, email))
    )[0];

    if (!dto) return null;

    const user = new User(
      dto.id,
      dto.firstName,
      dto.lastName,
      dto.email,
      dto.counter!,
      dto.subscriptionEndsAt ?? new Date()
    );

    const proxiedEntity = new ChangeTrackingProxy(user) as User;

    return proxiedEntity;
  }

  async getById(id: string) {
    const dto = (await db.select().from(users).where(eq(users.id, id)))[0];

    if (!dto) return null;

    const user = new User(
      dto.id,
      dto.firstName,
      dto.lastName,
      dto.email,
      dto.counter!,
      dto.subscriptionEndsAt ?? new Date()
    );

    return user;
  }
}
