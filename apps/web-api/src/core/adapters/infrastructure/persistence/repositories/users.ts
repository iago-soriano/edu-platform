import { IUserRepository } from "@core/application/interfaces";
import { db, users } from "../schema";
import { eq } from "drizzle-orm";
import { AllTables } from "./all-tables";
import { BaseRepository } from "@edu-platform/common/platform";

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
    return (await db.select().from(users).where(eq(users.email, email)))[0];
  }

  async getById(id: string) {
    return (await db.select().from(users).where(eq(users.id, id)))[0];
  }
}
