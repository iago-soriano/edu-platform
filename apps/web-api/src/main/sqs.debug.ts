import dotenv from "dotenv";
dotenv.config(); // call this before importing main, because that will use env variables
import { SQSEvent } from "aws-lambda";
import { handler } from "index.sqs";

(async () => {
  const event: SQSEvent = {
    Records: [
      {
        messageId: "6855c8dd-46dc-4fc0-9d6f-472e2ebb3bcf",
        receiptHandle:
          "AQEBdzFMbMVXVt2J/1IQ5FEjsFWDUe5fxA1h8GTVyvg7GxwWwfgMxMWdKupULjnLxSNmSfSQdAvjvPSdiBGH9F0w4WnRPD5ynLaGO/cHAufdgBwoHxITRPBvoPWON7eoa9K7BvIo/M53CNtFqeCzGLLdV2sbPW3tVUNK3ik6uV/JRIH+otxWdGNRx70HXyv/qc11R9WB9jXqXYMWXIbMi9yQRikDOqVAU3Erz/rzumJvT2nuZgTqcE1bNYzYPAceTlOOi15CECTBVDxy18jV31rLGOyX6LhLQSYNyqgE9YZPGbvxt12BYPHXVzIQyZ6lpebBtCit7mjVI7+z4iXsIJropPkyUjp/zi6fPRK/+OHZrZsSTXHhwpnX3pI8N7aj/sA2fmfBl2yu1lNOSpE11rAm0Q==",
        body: '{"id":"187f4bcb-d1bc-4110-a095-112404171c8e","email":"iago.srm.iss084@gmail.com","name":"iagão"}',
        messageAttributes: {
          eventType: { stringValue: "UserCreated", dataType: "String" },
        },
        attributes: {
          ApproximateReceiveCount: "",
          SentTimestamp: "",
          SenderId: "",
          ApproximateFirstReceiveTimestamp: "",
        },
        md5OfBody: "b0776d5f829d851eddd7ddfd8a9f2a03",
        eventSource: "aws:sqs",
        eventSourceARN: "arn:aws:sqs:us-east-1:550488701486:domain-queue",
        awsRegion: "us-east-1",
      },
    ],
  };
  await handler(event);
})();
