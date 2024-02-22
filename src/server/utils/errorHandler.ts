import { MongoError } from "mongodb";
import errorLogger from "./logger";

export default function handleError(e: unknown, callback: () => void) {
  if (e instanceof MongoError) {
    errorLogger.log("error", "Mongo error: " + e.message);
  } else {
    errorLogger.log("error", (e as Error).message);
  }
  callback();
}
