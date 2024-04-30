import { users } from "../../schema";
import { User } from "@core/domain/entities";

export class UserSerializer {
  static serialize(domain: User) {
    const dto: typeof users.$inferInsert = {
      foreignId: domain.foreignId,
      name: domain.name!,
      email: domain.email!,
    };
    return dto;
  }
}
