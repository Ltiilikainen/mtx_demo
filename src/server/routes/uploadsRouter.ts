import express from "express";
import { mongoConnect, mongoDisconnect } from "../dbServices/mongoConnect.js";
import uploadsServices from "../dbServices/uploadsServices.js";
import upload from "../utils/upload.js";
import fs from "fs";
import referrerServices from "../dbServices/referrerServices.js";
import handleError from "../utils/errorHandler";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    await mongoConnect();
    const uploads = await uploadsServices.readUploads();
    await mongoDisconnect();
    res.status(200).send(uploads);
  } catch (e) {
    handleError(e, () => res.status(500).send("Internal server error"));
  }
});

router.post("/", async (req, res) => {
  const file: File = req.body;

  const uploadInfo = req.query.filetype?.toString();

  if (!file) return res.status(400).send("Missing file!");

  if (uploadInfo === "image") {
    upload.img(req, res, async (e) => {
      if (e) {
        handleError(e, () => {
          if ((e as Error).message === "Invalid file type")
            res.status(400).send("Invalid file type");
          else res.status(500).send("Internal server error");
        });
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
          handleError(e, () => res.status(500).send("Internal server error"));
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
    handleError(e, () => res.status(500).send("Internal server error"));
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
    handleError(e, () => res.status(500).send("Internal server error"));
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const cascade = req.query.cascade;

  try {
    await mongoConnect();
    const upload = await uploadsServices.deleteUpload(id);

    if (!upload) throw new Error("Unable to delete upload");
    try {
      //if /:id?cascade=true, go through referrers and set any images with the deleted upload's ID to empty string
      if (cascade === "true") {
        const refs = await referrerServices.readReferrers({
          image: upload._id
        });

        (refs as Referrer[]).forEach(
          async (ref) =>
            await referrerServices.updateReferrer(ref._id, { image: "" })
        );
      }
      await mongoDisconnect();
      fs.unlink(`.${upload.path}`, () => {
        res.status(200).send(upload);
      });
    } catch (e) {
      handleError(e, async () => {
        let type: "image" | "audio" | "video" = "image";
        if (upload.type === "image") type = "image";
        if (upload.type === "video") type = "video";
        if (upload.type === "audio") type = "audio";
        await uploadsServices.writeUpload({ path: upload.path, type: type });

        res.status(500).send("Internal server error");
      });
    }
  } catch (e) {
    handleError(e, () => res.status(500).send("Internal server error"));
  }
});

export default router;
