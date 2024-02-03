import mongoose, { Collection, Schema } from "mongoose";
import Uploads from "./Uploads.js";

const ReferrerSchema = new mongoose.Schema(
  {
    refName: {
      type: String,
      required: [true, "Referrer name is required"]
    },
    affiliation: {
      type: String,
      required: [true, "Referrer affiliation is required"]
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: Uploads
    },
    content: {
      type: String,
      required: [true, "Reference text is required"]
    }
  },
  {
    collection: "Referrers",
    query: {
      populatePaths() {
        return this.populate("image").exec();
      }
    }
  }
);

export default mongoose.model("Referrers", ReferrerSchema);
