import { AuthRules } from "@edu-platform/common";
import dotenv from "dotenv";
dotenv.config(); // cal
import express from "express";
import { Client } from "pg";
import "express-async-errors";
import serverless from "serverless-http";

const app = express();
app.use(express.json());

export const pgClient = new Client({
  connectionString: process.env.DATABASE_URL,
});
app.get("/", async (req, res) => {
  let resp;
  try {
    resp = await pgClient.connect();
  } catch (ex) {
    resp = ex;
  }

  return res
    .status(200)
    .json(
      `Hello World! \n dbURL ${process.env.DATABASE_URL} \n common: ${AuthRules.PASSWORD_REGEX} \n dbResp ${resp} `
    );
});

export const handler = serverless(app);
