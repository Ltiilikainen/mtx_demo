import express from "express";
import { mongoConnect, mongoDisconnect } from "../dbServices/mongoConnect";
import referrerServices from "../dbServices/referrerServices";
import { handleError } from "../main";

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
    await mongoDisconnect();
    res.status(200).send((referrers as Referrer[])[0]);
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
