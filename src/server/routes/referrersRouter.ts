import express from "express";
import { mongoConnect, mongoDisconnect } from "../dbServices/mongoConnect.js";
import { MongoError } from "mongodb";
import referrerServices from "../dbServices/referrerServices.js";

const router = express.Router();

router.get("/", async (_, res) => {
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

router.post("/", async (req, res) => {
  const referrer: ReferrerInput = req.body.referrer;
  try {
    await mongoConnect();
    const newReferrer = await referrerServices.addReferrer(referrer);
    await mongoDisconnect();
    res.status(201).send(newReferrer);
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
    const referrers = await referrerServices.readReferrers({ _id: id });
    await mongoDisconnect();
    res.status(200).send((referrers as Referrer[])[0]);
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
    const updatedRef = await referrerServices.updateReferrer(id, updatedInfo);
    await mongoDisconnect();
    res.status(200).send(updatedRef);
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
    const deletedRef = await referrerServices.deleteReferrer(id);
    await mongoDisconnect();
    res.status(200).send(deletedRef);
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
