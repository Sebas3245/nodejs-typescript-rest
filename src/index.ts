import { RestServer } from "../cmd/restservice/server";
import config from "./config";

const restServer = new RestServer();

restServer.start(config.port);
