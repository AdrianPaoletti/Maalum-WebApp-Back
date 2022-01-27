import express from "express";
import morgan from "morgan";
import cors from "cors";
import chalk from "chalk";
import Debug from "debug";
import reservationRoutes from "./routes/reservationRoutes";

const debug = Debug("znzApp:server");

const app = express();

app.use(cors());

const initilizeServer = (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.green(`Listening on port ${port}`));
      resolve(server);
    });

    server.on("error", (error: { code: string }) => {
      debug(chalk.red("An error with the server occurred"));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`Port ${port} is in use`));
      }
      reject();
    });

    server.on("close", () => {
      debug(chalk.yellow("Server disconnected."));
    });
  });

app.use(morgan("dev"));
app.use(express.json());

app.use("/reservations", reservationRoutes);

export { initilizeServer, app };
