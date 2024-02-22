import express from "express";
import { mongoConnect, mongoDisconnect } from "../dbServices/mongoConnect.js";
import newsServices from "../dbServices/newsServices.js";
import { handleError } from "../main.js";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    await mongoConnect();
    const news = await newsServices.readNews();
    await mongoDisconnect();
    res.status(200).send(news);
  } catch (e) {
    handleError(e, () => res.status(500).send("Internal server error"));
  }
});

router.post("/", async (req, res) => {
  const newsItem: NewsInput = req.body.newsItem;
  try {
    await mongoConnect();
    const newNewsItem = await newsServices.addNewsItem(newsItem);
    await mongoDisconnect();
    res.status(201).send(newNewsItem);
  } catch (e) {
    handleError(e, () => res.status(500).send("Internal server error"));
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await mongoConnect();
    const news = await newsServices.readNews({ _id: id });
    if (news.length < 1) {
      res.status(404).send("Could not find any news.");
      await mongoDisconnect();
      return;
    } else {
      res.status(200).send(news[0]);
    }
    await mongoDisconnect();
  } catch (e) {
    handleError(e, () => res.status(500).send("Internal server error"));
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedInfo: { [key: string]: string } = req.body.updatedInfo;

  try {
    await mongoConnect();
    const updatedItem = await newsServices.updateNewsItem(id, updatedInfo);
    await mongoDisconnect();
    res.status(200).send(updatedItem);
  } catch (e) {
    handleError(e, () => res.status(500).send("Internal server error"));
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await mongoConnect();
    const deletedNewsItem = await newsServices.deleteNewsItem(id);
    await mongoDisconnect();
    res.status(200).send(deletedNewsItem);
  } catch (e) {
    handleError(e, () => res.status(500).send("Internal server error"));
  }
});

export default router;
