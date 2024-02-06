import express from "express";
import { mongoConnect, mongoDisconnect } from "../dbServices/mongoConnect.js";
import { MongoError } from "mongodb";
import uploadsServices from "../dbServices/uploadsServices.js";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    await mongoConnect();
    const referrers = await uploadsServices.readUploads();
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
  const upload: UploadInput = req.body.upload;
  try {
    await mongoConnect();
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

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const uploads = await uploadsServices.readUploads({ _id: id });
    res.status(200).send(uploads[0]);
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

router.delete("/api/referrers/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await mongoConnect();
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

export default router;
