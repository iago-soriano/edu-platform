import { Notification } from "@core/domain/entities";
import {
  ListNotificationsResponseBody,
  PaginatedParamsDTO,
} from "@edu-platform/common";
import { IAbstractRepository } from "@edu-platform/common/platform";

export interface INotificationsRepository extends IAbstractRepository {
  findById: (id: number) => Promise<Notification>;
}

export interface INotificationsReadRepository {
  list: (
    args: { userId: string } & PaginatedParamsDTO
  ) => Promise<ListNotificationsResponseBody>;
}
