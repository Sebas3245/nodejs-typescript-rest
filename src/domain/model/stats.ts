export interface Stats {
  count_anomalies: number;
  count_no_anomalies: number;
  ratio: number;
}

export const newStats = (data: Record<string, string | number>): Stats => {
  return {
    count_anomalies: Number(data.count_anomalies),
    count_no_anomalies: Number(data.count_no_anomalies),
    ratio: Number(data.ratio),
  };
};
