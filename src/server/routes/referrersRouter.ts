import express from "express";
import { mongoConnect, mongoDisconnect } from "../dbServices/mongoConnect";
import referrerServices from "../dbServices/referrerServices";
import handleError from "../utils/errorHandler";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    await mongoConnect();
    const referrers = await referrerServices.readReferrers();
    await mongoDisconnect();
    res.status(200).send(referrers);
  } catch (e) {
    handleError(e, () => res.status(500).send("Internal server error"));
  }
});

router.post("/", async (req, res) => {
  const referrer: ReferrerInput = req.body.referrer;
  if (
    !referrer ||
    !referrer.refName ||
    !referrer.affiliation ||
    !referrer.content
  ) {
    res.status(401).send("Invalid or missing parameters");
    return;
  }
  try {
    await mongoConnect();
    const newReferrer = await referrerServices.addReferrer(referrer);
    await mongoDisconnect();
    res.status(201).send(newReferrer);
  } catch (e) {
    handleError(e, () => res.status(500).send("Internal server error"));
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await mongoConnect();
    const referrers = await referrerServices.readReferrers({ _id: id });
    if ((referrers as Referrer[]).length < 1) {
      res.status(404).send("Could not find any referrers.");
      await mongoDisconnect();
      return;
    } else {
      res.status(200).send((referrers as Referrer[])[0]);
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
    const updatedRef = await referrerServices.updateReferrer(id, updatedInfo);
    await mongoDisconnect();
    res.status(200).send(updatedRef);
  } catch (e) {
    handleError(e, () => res.status(500).send("Internal server error"));
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
    handleError(e, () => res.status(500).send("Internal server error"));
  }
});

export default router;
