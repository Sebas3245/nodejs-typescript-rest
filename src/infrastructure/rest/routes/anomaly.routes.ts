import { Application } from "express";
import { AnomalyController } from "../controllers/anomaly.controller";

export function setAnomalyRoutes(
  app: Application,
  anomalyController: AnomalyController
): void {
  app.post(
    "/validate-anomaly",
    anomalyController.validateAnomaly.bind(anomalyController)
  );
}
