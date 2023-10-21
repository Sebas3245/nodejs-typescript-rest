import { Pool } from "pg";
import config from "../../../../config";

export class PostgresFactory {
  private static pool: Pool | null = null;

  static createConnection() {
    if (!this.pool) {
      this.pool = new Pool({
        connectionString: config.databaseUrl,
      });

      this.pool.on("connect", () => {});

      this.pool.on("error", (err) => {
        process.exit(-1);
      });

      (async () => {
        if (!this.pool) return;
        const client = await this.pool.connect();

        try {
          const deleteableQuery = `
            DROP TABLE IF EXISTS stats;
          `;

          await client.query("BEGIN");
          await client.query(deleteableQuery);
          await client.query("COMMIT");

          const createTableQuery = `
            CREATE TABLE IF NOT EXISTS stats (
              id SERIAL PRIMARY KEY,
              count_anomalies INTEGER NOT NULL,
              count_no_anomalies INTEGER NOT NULL,
              ratio REAL NOT NULL
            );
          `;

          await client.query("BEGIN");
          await client.query(createTableQuery);
          await client.query("COMMIT");
        } catch (error) {
          await client.query("ROLLBACK");
          throw error;
        } finally {
          client.release();
        }
      })();
    }

    return this.pool;
  }

  static closeConnections() {
    if (this.pool) {
      this.pool.end(() => {
        console.log("Conections closed");
      });
    }
  }
}
