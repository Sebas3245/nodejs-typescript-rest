import { Anomaly } from "../../../domain/model/anomaly";
import { ValidateAnomalyRequest } from "../dto/dtorequest/validate_anomaly";
import { ValidateAnomalyResponse } from "../dto/dtoresponse/validate_anomaly";

export const requestValidateAnomalyToDomain = (
  dataFrom: ValidateAnomalyRequest
): Anomaly => {
  return {
    dna: dataFrom.dna,
    hasAnomaly: false,
    dnaMatrix: "",
  };
};

export const domainValidateAnomalyToResponse = (
  dataFrom: Anomaly
): ValidateAnomalyResponse => {
  return {
    hasAnomaly: dataFrom.hasAnomaly,
    dnaMatrix: dataFrom.dnaMatrix,
  };
};
