import { MongoError } from "mongodb";
import errorLogger from "./logger";
import { mongoDisconnect } from "../dbServices/mongoConnect";

export default function handleError(e: unknown, callback: () => void) {
  mongoDisconnect().then(() => {
    if (e instanceof MongoError) {
      errorLogger.log("error", "Mongo error: " + e.message);
    } else {
      errorLogger.log("error", (e as Error).message);
    }
    callback();
  });
}
