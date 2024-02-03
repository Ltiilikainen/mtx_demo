import News from "../schemas/News.js";

function readNews(query?: { [key: string]: unknown }) {
  if (query?.sample) return News.aggregate([{ $sample: { size: 3 } }]);
  if (query) return News.find(query);
  else return News.find();
}

export default { readNews };
