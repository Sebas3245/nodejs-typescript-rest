import { Pool } from "pg";
import { DBRepository } from "./db";

export class PostgresqlRepository implements DBRepository {
  private readonly pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async create(entity: string, data: Record<string, any>): Promise<void> {
    const client = await this.pool.connect();
    try {
      const keys = Object.keys(data);
      const values = Object.values(data);

      const insertColumns = keys.join(", ");
      const insertValues = keys.map((_, index) => `$${index + 1}`).join(", ");

      const insertQuery = `
        INSERT INTO ${entity} (${insertColumns})
        VALUES (${insertValues});
      `;

      await client.query("BEGIN");
      await client.query(insertQuery, values);
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async update(
    entity: string,
    entityId: number,
    data: Record<string, any>
  ): Promise<void> {
    const client = await this.pool.connect();
    try {
      const keys = Object.keys(data);
      const setClauses = keys.map((key, index) => `${key} = $${index + 2}`);
      const values = [entityId, ...keys.map((key) => data[key])];

      const updateQuery = `
        UPDATE ${entity}
        SET ${setClauses.join(", ")}
        WHERE id = $1;
      `;

      await client.query("BEGIN");
      await client.query(updateQuery, values);
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async getById(
    entity: string,
    id: number
  ): Promise<Record<string, any> | null> {
    const client = await this.pool.connect();
    try {
      const query = `
        SELECT * FROM ${entity}
        WHERE id = $1;
      `;

      const result = await client.query(query, [id]);

      if (result.rows.length === 1) {
        return result.rows[0];
      }

      return null;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
}
