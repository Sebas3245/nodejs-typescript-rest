# Node.js Typescript Express REST API

Hi! I'am Juan Sebastian Lara Aros and this my project in Node.js Typescript app with Hexagonal DDD architecture and PostgreSQL database

## Endpoints

### POST /validate-anomaly

This endpoint receives a matrix of strings and returns a boolean indicating if the matrix has an anomaly or not. The matrix should be in the following format:

```
[["A", "C", "A", "D"], ["A", "B", "C", "D"], ["A", "C", "C", "A"], "C", "B", "C", "D"]
```

### GET /stats

This endpoint returns an object with the count of anomalies, the count of no anomalies, and the ratio between them. The object should be in the following format:

```
{"count_anomalies": 30, "count_no_anomalies": 70, "ratio": 0.3}
```

## Usage

To use the endpoints, send a request to the appropriate URL using an HTTP client such as Postman or cURL. The base URL for the API is ``.

## Database

This project uses a PostgreSQL database, which is also deployed on Vercel.
