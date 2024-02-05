import News from "../schemas/News.js";

function readNews(query?: { [key: string]: unknown } | number) {
  if (typeof query === "number")
    return News.find().sort({ created_at: -1 }).limit(query);
  else if (query) return News.find(query).sort({ created_at: -1 });
  else return News.find().sort({ created_at: -1 });
}

async function addNewsItem(newsItem: NewsInput) {
  return News.create(newsItem);
}

async function updateNewsItem(id: string, info: { [key: string]: string }) {
  const test = await News.find({ _id: id });
  if (test.length < 1) {
    throw new Error("Item could not be found");
  }
  return News.findOneAndUpdate({ _id: id }, info);
}

async function deleteNewsItem(id: string) {
  const test = await News.find({ _id: id });
  if (test.length < 1) {
    throw new Error("Item could not be found");
  }
  return News.findOneAndDelete({ _id: id });
}

export default { readNews, addNewsItem, updateNewsItem, deleteNewsItem };
