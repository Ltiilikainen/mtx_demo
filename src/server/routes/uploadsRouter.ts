import express from "express";
import { mongoConnect, mongoDisconnect } from "../dbServices/mongoConnect.js";
import { MongoError } from "mongodb";
import uploadsServices from "../dbServices/uploadsServices.js";
import upload from "../upload.js";
import fs from "fs";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    await mongoConnect();
    const uploads = await uploadsServices.readUploads();
    await mongoDisconnect();
    res.status(200).send(uploads);
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
  const file: File = req.body;

  const uploadInfo = req.query.filetype?.toString();

  if (!file) return res.status(400).send("Missing file!");

  if (uploadInfo === "image") {
    upload.img(req, res, async (error) => {
      if (error) {
        console.log((error as Error).message);
        if ((error as Error).message === "Invalid file type")
          res.send("Invalid file type.");
        else res.send("Internal server error.");
      } else {
        try {
          await mongoConnect();
          const upload = await uploadsServices.writeUpload({
            path: req.body.path,
            type: "image"
          });
          await mongoDisconnect();

          res.status(201).send(upload);
        } catch (e) {
          if (e instanceof MongoError) {
            console.log("Mongo error: " + e.message);
            res.status(500).send("Internal server error");
          } else {
            console.log((e as Error).message);
            res.status(500).send("Unknown error occurred");
          }
        }
      }
    });
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
    const upload = await uploadsServices.updateUpload(id, updatedInfo);
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
    const upload = await uploadsServices.deleteUpload(id);
    await mongoDisconnect();
    if (!upload) throw new Error("Unable to delete upload");
    try {
      fs.unlink(`.${upload.path}`, () => {
        res.status(200).send(upload);
      });
    } catch (e) {
      console.log((e as Error).message);
      let type: "image" | "audio" | "video" = "image";
      if (upload.type === "image") type = "image";
      if (upload.type === "video") type = "video";
      if (upload.type === "audio") type = "audio";
      uploadsServices.writeUpload({ path: upload.path, type: type });

      res.status(500).send("Internal server error");
    }
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
