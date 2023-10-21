import { eEngine } from "../../../types/engine";
import { PostgresFactory } from "./manager/postgres";
import { DBRepository } from "./repository/db";
import { PostgresqlRepository } from "./repository/postgres";

const createPostgresqlProvider = () => {
  const pool = PostgresFactory.createConnection();
  return new PostgresqlRepository(pool);
};

const dbFactory = (engine: eEngine) => {
  switch (engine) {
    case eEngine.POSTGRES:
      return createPostgresqlProvider();
    default:
      throw new Error("Invalid engine");
  }
};

export const NewDB = (engine: eEngine): DBRepository => {
  return dbFactory(engine);
};
