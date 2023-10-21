import { Request, Response } from "express";
import { AnomalyService } from "../../../application/anomaly/anomaly.service";
import { validAnomalyRequest } from "../dto/dtorequest/validate_anomaly";
import {
  domainValidateAnomalyToResponse,
  requestValidateAnomalyToDomain,
} from "../mapper/validate_anomaly";

export class AnomalyController {
  private readonly anomalyService: AnomalyService;

  constructor(anomalyService: AnomalyService) {
    this.anomalyService = anomalyService;
  }

  async validateAnomaly(req: Request, res: Response) {
    const body = req.body;

    if (!validAnomalyRequest(body)) {
      res.status(400).json({
        message:
          "Invalid request you may not have sent the 'dna' parameter or it may not be a bidirectional matrix.",
      });
      return;
    }

    const dataRequest = requestValidateAnomalyToDomain(body);

    const response = await this.anomalyService.validateAnomaly(dataRequest);

    const dataResponse = domainValidateAnomalyToResponse(response);
    console.log(dataResponse.dnaMatrix);
    if (dataResponse.hasAnomaly) {
      res.status(200).json(dataResponse);
    } else {
      res.status(403).json(dataResponse);
    }
  }
}
