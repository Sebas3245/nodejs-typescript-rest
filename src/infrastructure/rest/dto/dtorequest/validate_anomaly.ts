export interface ValidateAnomalyRequest {
  dna: string[][];
}

export function validAnomalyRequest(anomalyRequest: Record<string, any>) {
  if (
    anomalyRequest &&
    anomalyRequest.dna &&
    Array.isArray(anomalyRequest.dna) &&
    anomalyRequest.dna.length > 0
  ) {
    const length = anomalyRequest.dna.length;
    return anomalyRequest.dna.every(
      (innerArray) =>
        Array.isArray(innerArray) &&
        innerArray.length === length &&
        innerArray.every((item) => typeof item === "string")
    );
  }
  return false;
}
