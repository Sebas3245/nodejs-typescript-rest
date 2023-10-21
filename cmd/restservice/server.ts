import express, { Application } from "express";
import { AnomalyService } from "../../src/application/anomaly/anomaly.service";
import { StatsService } from "../../src/application/stats/stats.service";
import { AnomalyController } from "../../src/infrastructure/rest/controllers/anomaly.controller";
import { StatsController } from "../../src/infrastructure/rest/controllers/stats.controller";
import { setAnomalyRoutes } from "../../src/infrastructure/rest/routes/anomaly.routes";
import { setStatsRoutes } from "../../src/infrastructure/rest/routes/stats.routes";
import { NewDB } from "../../src/shared/infraestructure/database";
import { DBRepository } from "../../src/shared/infraestructure/database/repository/db";
import { errorMiddleware } from "../../src/shared/infraestructure/middleware/error";
import { eEngine } from "../../src/types/engine";

export class RestServer {
  private app: Application;
  private dbRepository: DBRepository;

  constructor() {
    this.app = express();
    this.dbRepository = NewDB(eEngine.POSTGRES);
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(errorMiddleware);
  }

  private setupRoutes() {
    this.app.get("/", (req, res) => {
      res.send(
        `Hi! STT Group I'am Juan Sebastian Lara Aros and this is my project in Node.js Typescript app with Hexagonal DDD architecture and PostgreSQL database, you can use the end-point: [POST] /validate-anomaly and [GET]: /stats`
      );
    });

    const anomalyService = new AnomalyService(this.dbRepository);
    const anomalyController = new AnomalyController(anomalyService);

    const statsService = new StatsService(this.dbRepository);
    const statsController = new StatsController(statsService);

    setAnomalyRoutes(this.app, anomalyController);
    setStatsRoutes(this.app, statsController);
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}
