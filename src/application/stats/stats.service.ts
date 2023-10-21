import { newStats } from "../../domain/model/stats";
import { DBRepository } from "../../shared/infraestructure/database/repository/db";

export class StatsService {
  private dbRepository: DBRepository;

  constructor(dbRepository: DBRepository) {
    this.dbRepository = dbRepository;
  }

  async getStats() {
    let currentStats = {
      count_anomalies: 0,
      count_no_anomalies: 0,
      ratio: 0,
    };

    const dbStats = await this.dbRepository.getById("stats", 1);
    if (!dbStats) {
      return currentStats;
    }

    currentStats = newStats(dbStats);

    return currentStats;
  }
}
