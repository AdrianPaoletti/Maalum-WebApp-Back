import dotenv from "dotenv";

import { initilizeServer } from "./server/index";
import connectDB from "./database/index";

dotenv.config();

const port: string | number =
  process.env.PORT ?? process.env.SERVER_PORT ?? 6001;

(async () => {
  try {
    await connectDB(process.env.MONGODB_STRING);
    initilizeServer(+port);
  } catch (error) {
    process.exit(1);
  }
})();
