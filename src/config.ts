import * as dotenv from "dotenv";
dotenv.config();

export default {
  port: parseInt(process.env.PORT || "8080"),
  databaseUrl: process.env.DB_URL,
};
