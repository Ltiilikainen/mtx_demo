import mongoose from "mongoose";

const UploadSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    path: { type: String, required: true }
  },
  {
    collection: "Uploads",
    query: {
      selectImages() {
        return this.where({ type: "image" });
      },
      selectAudio() {
        return this.where({ type: "audio" });
      },
      selectVideo() {
        return this.where({ type: "video" });
      }
    }
  }
);

export default mongoose.model("Uploads", UploadSchema);
