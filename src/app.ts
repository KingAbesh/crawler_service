import "module-alias/register";
import express, { Request, Response, Express } from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import config from "./config";
import createError from "@helpers/createError";
import logger from "./logger";
import { RESPONSE } from "@constants/enums";
import { scraperDaemon } from "./workers/daemon/scraper";

const app: Express = express();

// global middlewares
app.use(cors() as any);
app.use(helmet() as any);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression() as any);
app.use(morgan("dev") as any);

const apiRouter = express.Router();

// For health checks
apiRouter.get("/", (_, res) => {
  res.status(200).json({
    status: RESPONSE.SUCCESS,
    message: "Service up and running..",
    data: null,
  });
});

// handler for route-not-found
apiRouter.use((_req: Request, _res: Response, next) => {
  next(
    createError(404, [
      {
        status: RESPONSE.ERROR,
        title: "Route not found",
        detail: "The requested route is not implemented",
      },
    ])
  );
});

// error handler for api router
apiRouter.use((error: any, _req: Request, res: Response, _next: Function) => {
  if (!error.status) {
    error = createError(500, [
      {
        title: "Internal Server Error",
        detail: error.toString(),
      },
    ]);
  }

  res.status(error.status).json({
    status: error.status,
    errors: error.errors,
    // stack: error.stack,
  });
});

const apiURL = `/crawler`;
const { port } = config();

app.use(apiURL, apiRouter); // link up routes

const server = http.createServer(app);

server.listen(port, async function onListen() {
  scraperDaemon();
  logger.info(`Server is up and running at ${apiURL} on port ${port}`);
});

export default server;
