import Uploads from "../schemas/Uploads";

function readUploads(query?: { [key: string]: unknown }) {
  if (query?.sample) return Uploads.aggregate([{ $sample: { size: 3 } }]);
  if (query) return Uploads.find(query);
  else return Uploads.find();
}

function writeUpload(upload: UploadInput) {
  return Uploads.create(upload);
}

async function updateUpload(id: string, info: { [key: string]: string }) {
  const test = await Uploads.find({ _id: id });
  if (test.length < 1) {
    throw new Error("Referrer could not be found");
  }
  return Uploads.findOneAndUpdate({ _id: id }, info);
}

async function deleteUpload(id: string) {
  const test = await Uploads.find({ _id: id });
  if (test.length < 1) {
    throw new Error("Referrer could not be found");
  }
  return Uploads.findOneAndDelete({ _id: id });
}

export default { readUploads, writeUpload, updateUpload, deleteUpload };
