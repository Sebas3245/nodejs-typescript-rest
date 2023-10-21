import { Router } from "express";
import { StatsController } from "../controllers/stats.controller";

export function setStatsRoutes(
  router: Router,
  statsController: StatsController
): void {
  router.get("/stats", statsController.getStats.bind(statsController));
}
