import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoDbUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/";
const mongoUser = process.env.MONGODB_USER;
const mongoPwd = process.env.MONGODB_PASSWORD;
console.log(mongoDbUrl);

export async function mongoConnect() {
  try {
    await mongoose.connect(mongoDbUrl, {
      auth: { username: mongoUser, password: mongoPwd }
    });
  } catch (e) {
    console.log((e as Error).message);
    return;
  }
  console.log("Mongodb client connected");
}

export async function mongoDisconnect() {
  try {
    await mongoose.disconnect();
  } catch (e) {
    console.log((e as Error).message);
    return;
  }
  console.log("Mongodb client disconnected");
}
