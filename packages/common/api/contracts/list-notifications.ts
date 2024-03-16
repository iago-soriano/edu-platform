import { PaginatedParamsDTO } from "@edu-platform/common";

type NotificationDto = {
  id: number;
  isNew: boolean;
  //type: como eu faço? porque os types tão na domain - copiar
  message: string;
  details: string;
};

type ResponseBody = {
  notifications: NotificationDto[]; // fazer = activity version
  totalNew: number;
};
type Query = PaginatedParamsDTO;

export {
  ResponseBody as ListNotificationsResponseBody,
  Query as ListNotificationsQuery,
};
