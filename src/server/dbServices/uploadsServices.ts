import Uploads from "../schemas/Uploads.js";

function readUploads(query?: { [key: string]: unknown }) {
  if (query?.sample) return Uploads.aggregate([{ $sample: { size: 3 } }]);
  if (query) return Uploads.find(query);
  else return Uploads.find();
}

export default { readUploads };
