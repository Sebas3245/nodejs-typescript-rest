import { Request, Response } from "express";
import { StatsService } from "../../../src/application/stats/stats.service";
import { StatsController } from "../../../src/infrastructure/rest/controllers/stats.controller";
import { NewDB } from "../../../src/shared/infraestructure/database";
import { eEngine } from "../../../src/types/engine";

describe("StatsController", () => {
  let statsController: StatsController;
  let statsService: StatsService;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    const dbRepository = NewDB(eEngine.POSTGRES);

    statsService = new StatsService(dbRepository);
    statsController = new StatsController(statsService);
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("should return status 200 and the current stats", async () => {
    const dbStats = {
      count_anomalies: 5,
      count_no_anomalies: 10,
      ratio: 0.5,
    };

    statsService.getStats = jest.fn().mockResolvedValue(dbStats);

    const expectedStats = {
      count_anomalies: 5,
      count_no_anomalies: 10,
      ratio: 0.5,
    };

    await statsController.getStats(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(expectedStats);
  });
});
