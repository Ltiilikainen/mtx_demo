import express from "express";
import ViteExpress from "vite-express";
import { mongoConnect, mongoDisconnect } from "./dbServices/mongoConnect.js";
import newsServices from "./dbServices/newsServices.js";
import { MongoError } from "mongodb";
import referrerServices from "./dbServices/referrerServices.js";

const app = express();
app.use(express.json());

app.get("/api/news", async (_, res) => {
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

app.get("/api/news/:id", async (req, res) => {
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

app.get("/api/referrers", async (_, res) => {
  try {
    await mongoConnect();
    const referrers = await referrerServices.readReferrers();
    await mongoDisconnect();
    res.status(200).send(referrers);
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

app.get("/api/references/:id", (req, res) => {
  try {
    const id = req.params.id;
    res.status(200).send("You are receiving the details for reference " + id);
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

app.post("/api/contact", (req, res) => {
  try {
    const data = req.body;
    res
      .status(200)
      .send(
        "You are trying to send a contact request email with the contents of " +
          data
      );
  } catch (e) {
    console.log((e as Error).message);
    res.status(500).send("Unknown error occurred");
  }
});

ViteExpress.listen(app, 3001, () =>
  console.log("Server is listening on port 3001...")
);
