import { Anomaly } from "../model/anomaly";

export interface AnomalyRepository {
  saveAnomaly(anomaly: Anomaly): Promise<void>;
}
