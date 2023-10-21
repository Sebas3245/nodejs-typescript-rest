import { StatsService } from "../../../src/application/stats/stats.service";
import { NewDB } from "../../../src/shared/infraestructure/database";
import { DBRepository } from "../../../src/shared/infraestructure/database/repository/db";
import { eEngine } from "../../../src/types/engine";

describe("StatsService", () => {
  let statsService: StatsService;
  let dbRepository: DBRepository;

  beforeEach(() => {
    dbRepository = NewDB(eEngine.POSTGRES);
    statsService = new StatsService(dbRepository);
  });

  test("should return current stats if they exist in the database", async () => {
    const dbStats = {
      count_anomalies: 5,
      count_no_anomalies: 10,
      ratio: 0.5,
    };

    dbRepository.getById = jest.fn().mockResolvedValue(dbStats);

    const expectedStats = {
      count_anomalies: 5,
      count_no_anomalies: 10,
      ratio: 0.5,
    };

    const result = await statsService.getStats();

    expect(result).toEqual(expectedStats);
  });

  test("should return default stats if they do not exist in the database", async () => {
    dbRepository.getById = jest.fn().mockResolvedValue(null);

    const expectedStats = {
      count_anomalies: 0,
      count_no_anomalies: 0,
      ratio: 0,
    };

    const result = await statsService.getStats();

    expect(result).toEqual(expectedStats);
  });
});
