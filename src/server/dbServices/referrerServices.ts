import Referrers from "../schemas/Referrers.js";

function readReferrers(query?: { [key: string]: unknown }) {
  if (query?.sample)
    return Referrers.aggregate([
      { $sample: { size: 3 } },
      { $addFields: { image: { $toObjectId: "$image" } } },
      {
        $lookup: {
          from: "Uploads",
          localField: "image",
          foreignField: "_id",
          as: "image"
        }
      }
    ]);
  if (query) return Referrers.find(query);
  else return Referrers.find();
}

export default { readReferrers };
