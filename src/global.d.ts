/*MTX-Demo global types*/

/*Data types:
__Input - MongoDb autogenerates _id field, so this typing is for data that has
yet to be put into the database */

interface NewsInput {
  title: string;
  body: string;
}

interface News extends NewsInput {
  _id: Schema.Types.ObjectId | string;
  created_at: string;
  updatedAt: string;
}

interface ReferrerBase {
  refName: string;
  affiliation: string;
  content: string;
}

interface ReferrerInput extends ReferrerBase {
  image?: Schema.Types.ObjectId | string;
}

interface Referrer extends ReferrerBase {
  _id: Schema.Types.ObjectId | string;
  image?: Schema.Types.ObjectId | Upload;
}

interface UploadInput {
  type: "image" | "audio" | "video";
  path: string;
}

interface Upload extends UploadInput {
  _id: Schema.Types.ObjectId | string;
}

type ContactFormData = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  purpose: string;
  startDate: string;
  endDate: string;
  body: string;
};
