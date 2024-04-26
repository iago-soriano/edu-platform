import { UserCreatedEvent } from "@edu-platform/common/domain/integration-events";
import dotenv from "dotenv";
dotenv.config(); // call this before importing main, because that will use env variables

import { handler } from "../../../index.sqs";

(async () => {
  const event = new UserCreatedEvent({
    id: 1,
    name: "Iago Soriano",
    email: "iago.srm.is@gmail.com",
  });
  await handler(event);
})();
