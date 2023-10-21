import { Stats } from "../../../domain/model/stats";
import { StatsResponse } from "../dto/dtoresponse/stats";

export const domainStatsToResponse = (
  dataFrom: Stats
): StatsResponse => {
  return {
    count_anomalies: dataFrom.count_anomalies,
    count_no_anomalies: dataFrom.count_no_anomalies,
    ratio: dataFrom.ratio,
  };
};
