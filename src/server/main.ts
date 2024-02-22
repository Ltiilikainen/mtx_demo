import ViteExpress from "vite-express";
import { MongoError } from "mongodb";
import errorLogger from "./utils/logger";
import createServer from "./utils/server";

const app = createServer();

ViteExpress.listen(app, 3001, () =>
  console.log("Server is listening on port 3001...")
);

export function handleError(e: unknown, callback: () => void) {
  if (e instanceof MongoError) {
    errorLogger.log("error", "Mongo error: " + e.message);
  } else {
    errorLogger.log("error", (e as Error).message);
  }
  callback();
}
