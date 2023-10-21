import { Anomaly } from "../../domain/model/anomaly";
import { DBRepository } from "../../shared/infraestructure/database/repository/db";

export class AnomalyService {
  private dbRepository: DBRepository;

  constructor(dbRepository: DBRepository) {
    this.dbRepository = dbRepository;
  }

  private isAnomalousSequence(sequence: string) {
    return /(.)\1{2,}/.test(sequence);
  }

  private checkAnomaly(dna: string[][]) {
    const rows = dna.length;
    const cols = dna[0].length;

    for (let ix = 0; ix < rows; ix++) {
      for (let iy = 0; iy < cols; iy++) {
        const sequences = [
          dna[ix]?.slice(iy, iy + 3).join(""), // horizontal
          dna
            .slice(ix, Math.min(ix + 3, rows))
            .map((row) => row[iy])
            .join(""), // vertical
          [dna[ix]?.[iy], dna[ix + 1]?.[iy + 1], dna[ix + 2]?.[iy + 2]].join(
            ""
          ), // diagonalRight
          [dna[ix]?.[iy], dna[ix + 1]?.[iy - 1], dna[ix + 2]?.[iy - 2]].join(
            ""
          ), // diagonalLeft
        ];

        if (sequences.some((sequence) => this.isAnomalousSequence(sequence))) {
          return true;
        }
      }
    }

    return false;
  }

  async validateAnomaly(data: Anomaly): Promise<Anomaly> {
    const { dna } = data;

    let currentStats = await this.dbRepository.getById("stats", 1);
    if (!currentStats) {
      currentStats = {
        id: 1,
        count_anomalies: 0,
        count_no_anomalies: 0,
        ratio: 0,
      };

      await this.dbRepository.create("stats", currentStats);
    }

    const hasAnomaly = this.checkAnomaly(dna);

    if (hasAnomaly) {
      currentStats.count_anomalies += 1;
    } else {
      currentStats.count_no_anomalies += 1;
    }

    currentStats.ratio =
      currentStats.count_anomalies /
      (currentStats.count_anomalies + currentStats.count_no_anomalies);

    await this.dbRepository.update("stats", 1, currentStats);

    return {
      ...data,
      hasAnomaly,
      dnaMatrix: dna.map((row) => JSON.stringify(row)).join("\n"),
    };
  }
}
