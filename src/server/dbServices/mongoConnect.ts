import mongoose from "mongoose";
import dotenv from "dotenv";
import errorLogger from "../utils/logger";

dotenv.config();

const mongoDbUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/";
const mongoUser = process.env.MONGODB_USER;
const mongoPwd = process.env.MONGODB_PASSWORD;

export async function mongoConnect() {
  //skip try-catch if client is connected
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(mongoDbUrl, {
        auth: { username: mongoUser, password: mongoPwd }
      });
    } catch (e) {
      errorLogger.log("warn", (e as Error).message);
      return;
    }
  }
}

export async function mongoDisconnect() {
  //don't disconnect if the readyState is at "connecting"
  if (mongoose.connection.readyState !== 2) {
    try {
      await mongoose.disconnect();
    } catch (e) {
      errorLogger.log("warn", (e as Error).message);
      return;
    }
  }
}
