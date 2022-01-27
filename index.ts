import dotenv from "dotenv";

dotenv.config();

import { initilizeServer } from "./server/index";
import connectDB from "./database/index";

const port: string | number =
  process.env.PORT ?? process.env.SERVER_PORT ?? 6001;

const urlMongo = process.env.MONGODB_STRING;

(async () => {
  try {
    await connectDB(`${urlMongo}`);
    initilizeServer(+port);
  } catch (error) {
    process.exit(1);
  }
})();
