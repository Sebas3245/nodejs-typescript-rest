import { Request, Response } from "express";
import { StatsService } from "../../../application/stats/stats.service";
import { domainStatsToResponse } from "../mapper/stats";

export class StatsController {
  private readonly statsService: StatsService;

  constructor(statsService: StatsService) {
    this.statsService = statsService;
  }

  async getStats(req: Request, res: Response) {
    const response = await this.statsService.getStats();
    const dataResponse = domainStatsToResponse(response);

    res.status(200).json(dataResponse);
  }
}
