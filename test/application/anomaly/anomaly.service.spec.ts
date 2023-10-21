import { AnomalyService } from "../../../src/application/anomaly/anomaly.service";
import { Anomaly } from "../../../src/domain/model/anomaly";
import { NewDB } from "../../../src/shared/infraestructure/database";
import { DBRepository } from "../../../src/shared/infraestructure/database/repository/db";
import { eEngine } from "../../../src/types/engine";

describe("AnomalyService", () => {
  let anomalyService: AnomalyService;
  let dbRepository: DBRepository;

  const testCases = [
    {
      dna: [
        ["A", "C", "A", "D"],
        ["A", "B", "C", "D"],
        ["A", "C", "C", "A"],
        ["C", "B", "C", "D"],
      ],
      expected: true,
    },
    {
      dna: [
        ["A", "B", "C", "D", "E"],
        ["A", "A", "A", "D", "D"],
        ["B", "A", "D", "A", "E"],
        ["A", "B", "C", "D", "A"],
        ["B", "A", "C", "D", "E"],
      ],
      expected: true,
    },
    {
      dna: [
        ["A", "B", "C", "D", "E"],
        ["A", "B", "C", "D", "D"],
        ["B", "A", "D", "D", "E"],
        ["A", "B", "C", "D", "A"],
        ["B", "A", "C", "D", "E"],
      ],
      expected: true,
    },
    {
      dna: [
        ["A", "B", "C", "D", "E"],
        ["A", "B", "C", "D", "C"],
        ["B", "A", "D", "C", "E"],
        ["A", "B", "C", "D", "A"],
        ["B", "A", "C", "D", "E"],
      ],
      expected: true,
    },
    {
      dna: [
        ["A", "B", "C", "D", "E"],
        ["A", "B", "C", "D", "B"],
        ["B", "A", "D", "A", "E"],
        ["A", "B", "A", "D", "A"],
        ["B", "A", "C", "D", "E"],
      ],
      expected: true,
    },
    {
      dna: [
        ["A", "B", "C", "D", "E"],
        ["C", "B", "C", "D", "B"],
        ["B", "A", "D", "A", "E"],
        ["A", "B", "B", "D", "A"],
        ["B", "A", "C", "D", "E"],
      ],
      expected: false,
    },
  ];

  beforeEach(() => {
    dbRepository = NewDB(eEngine.POSTGRES);
    anomalyService = new AnomalyService(dbRepository);
  });

  testCases.forEach((testCase, index) => {
    test(`should return an anomaly object with hasAnomaly set to ${
      testCase.expected
    } for test case ${index + 1}`, async () => {
      const anomalyRequest: Anomaly = {
        dna: testCase.dna,
        hasAnomaly: false,
        dnaMatrix: "",
      };

      const expectedAnomaly: Anomaly = {
        ...anomalyRequest,
        hasAnomaly: testCase.expected,
        dnaMatrix: anomalyRequest.dna
          .map((row) => JSON.stringify(row))
          .join("\n"),
      };

      const result = await anomalyService.validateAnomaly(anomalyRequest);

      expect(result).toEqual(expectedAnomaly);
    });
  });
});
