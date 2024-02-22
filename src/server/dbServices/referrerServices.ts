import Referrers from "../schemas/Referrers";

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
  if (query) return Referrers.find(query).populatePaths();
  else return Referrers.find().populatePaths();
}

async function addReferrer(referrer: ReferrerInput) {
  return Referrers.create(referrer);
}

async function updateReferrer(id: string, info: { [key: string]: string }) {
  const test = await Referrers.find({ _id: id });
  if (test.length < 1) {
    throw new Error("Referrer could not be found");
  }
  return Referrers.findOneAndUpdate({ _id: id }, info);
}

async function deleteReferrer(id: string) {
  const test = await Referrers.find({ _id: id });
  if (test.length < 1) {
    throw new Error("Referrer could not be found");
  }
  return Referrers.findOneAndDelete({ _id: id });
}

export default {
  readReferrers,
  addReferrer,
  updateReferrer,
  deleteReferrer
};
