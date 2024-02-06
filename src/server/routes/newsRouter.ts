import express from "express";
import { mongoConnect, mongoDisconnect } from "../dbServices/mongoConnect.js";
import { MongoError } from "mongodb";
import newsServices from "../dbServices/newsServices.js";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    await mongoConnect();
    const news = await newsServices.readNews();
    await mongoDisconnect();
    res.status(200).send(news);
  } catch (e) {
    if (e instanceof MongoError) {
      console.log("Mongo error: " + e.message);
      res.status(500).send("Internal server error");
    } else {
      console.log((e as Error).message);
      res.status(500).send("Unknown error occurred");
    }
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
    if (e instanceof MongoError) {
      console.log("Mongo error: " + e.message);
      res.status(500).send("Internal server error");
    } else {
      console.log((e as Error).message);
      res.status(500).send("Unknown error occurred");
    }
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
    if (e instanceof MongoError) {
      console.log("Mongo error: " + e.message);
      res.status(500).send("Internal server error");
    } else {
      console.log((e as Error).message);
      res.status(500).send("Unknown error occurred");
    }
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
    if (e instanceof MongoError) {
      console.log("Mongo error: " + e.message);
      res.status(500).send("Internal server error");
    } else {
      console.log((e as Error).message);
      res.status(500).send("Unknown error occurred");
    }
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
    if (e instanceof MongoError) {
      console.log("Mongo error: " + e.message);
      res.status(500).send("Internal server error");
    } else {
      console.log((e as Error).message);
      res.status(500).send("Unknown error occurred");
    }
  }
});

export default router;
