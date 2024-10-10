import { users } from "../schema";
import { User } from "domain/entities";

export class UserSerializer {
  static serialize(domain: User) {
    const dto: typeof users.$inferInsert = {
      id: domain.id,
      firstName: domain.firstName ?? "",
      lastName: domain.lastName ?? "",
      email: domain.email!,
      counter: domain.counter!,
      subscriptionEndsAt: domain.subscriptionEndsAt!,
    };
    return dto;
  }
}
