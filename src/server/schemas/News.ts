import mongoose, { Schema } from "mongoose";
import Uploads from "./Uploads";

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"]
    },
    body: {
      type: String,
      required: [true, "News text is required"]
    },
    media: {
      type: Schema.Types.ObjectId,
      ref: Uploads
    }
  },
  { timestamps: { createdAt: "created_at" }, collection: "News" }
);

export default mongoose.model("News", NewsSchema);
