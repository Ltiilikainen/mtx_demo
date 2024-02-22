import mongoose from "mongoose";
import dotenv from "dotenv";
import errorLogger from "../utils/logger";

dotenv.config();

const mongoDbUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/";
const mongoUser = process.env.MONGODB_USER;
const mongoPwd = process.env.MONGODB_PASSWORD;

export async function mongoConnect() {
  try {
    await mongoose.connect(mongoDbUrl, {
      auth: { username: mongoUser, password: mongoPwd }
    });
  } catch (e) {
    errorLogger.log("warn", (e as Error).message);
    return;
  }
}

export async function mongoDisconnect() {
  try {
    await mongoose.disconnect();
  } catch (e) {
    console.log("warn", (e as Error).message);
    return;
  }
}
