// import { AuthRules } from "@edu-platform/common";
// import { pathTest } from "@main";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Client } from "pg";
import "express-async-errors";
import serverless from "serverless-http";

const app = express();
app.use(express.json());

app.get("/hello", async (req, res) => {
  return res.status(200).json("Hello");
});

// app.get("/ts-paths", async (req, res) => {
//   return res.status(200).json(`${pathTest}`);
// });

app.get("/outside", async (req, res) => {
  // const http2 = require("http2");
  // function isConnected() {
  //   return new Promise((resolve) => {
  //     const client = http2.connect("https://www.google.com");
  //     client.on("connect", () => {
  //       resolve(true);
  //       client.destroy();
  //     });
  //     client.on("error", (e) => {
  //       console.log("error", e);
  //       resolve(false);
  //       client.destroy();
  //     });
  //   });
  // }
  // try {
  //   return res.status(200).json(await isConnected());
  // } catch (ex) {
  //   res.status(500).json(ex);
  // }
});

app.get("/connect-db", async (req, res) => {
  const pgClient = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  try {
    await pgClient.connect();
    return res.status(200).json(`${process.env.DATABASE_URL}`);
  } catch (ex) {
    return res.status(500).json(`error: ${ex}`);
  }
});

// app.get("/monorepo", (req, res) => {
//   return res.status(200).json(`${AuthRules.PASSWORD_INSTRUCTION}`);
// });

export const handler = serverless(app);

(async () => {
  try {
    await app.listen(3001, () => {
      console.log(`POC app listening on port 3001`);
    });
  } catch (e) {
    console.error("Server instanciation failed", e);
  }
})();
