import { Request, Response } from "express";
import { AnomalyService } from "../../../src/application/anomaly/anomaly.service";
import { AnomalyController } from "../../../src/infrastructure/rest/controllers/anomaly.controller";
import { NewDB } from "../../../src/shared/infraestructure/database";
import { eEngine } from "../../../src/types/engine";

describe("AnomalyController", () => {
  let anomalyController: AnomalyController;
  let anomalyService: AnomalyService;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    const dbRepository = NewDB(eEngine.POSTGRES);

    anomalyService = new AnomalyService(dbRepository);
    anomalyController = new AnomalyController(anomalyService);
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("should return status 400 if the request is invalid", async () => {
    mockRequest.body = { dna: ["invalid"] };

    await anomalyController.validateAnomaly(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message:
        "Invalid request you may not have sent the 'dna' parameter or it may not be a bidirectional matrix.",
    });
  });

  test("should return status 200 if the dna matrix has an anomalous sequence", async () => {
    mockRequest.body = {
      dna: [
        ["A", "A", "A"],
        ["B", "B", "B"],
        ["C", "C", "C"],
      ],
    };

    await anomalyController.validateAnomaly(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalled();
  });

  test("should return status 403 if the dna matrix does not have an anomalous sequence", async () => {
    mockRequest.body = {
      dna: [
        ["A", "B", "C"],
        ["D", "E", "F"],
        ["G", "H", "I"],
      ],
    };

    await anomalyController.validateAnomaly(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalled();
  });
});
