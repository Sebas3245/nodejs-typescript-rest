export interface DBRepository {
  create(entity: string, data: Record<string, any>): Promise<void>;

  update(
    entity: string,
    entityId: number,
    data: Record<string, any>
  ): Promise<void>;

  getById(entity: string, id: number): Promise<Record<string, any> | null>;
}
