import express from "express";
import { sendContactForm } from "./emailService";
import handleError from "./errorHandler";
import newsRouter from "../routes/newsRouter";
import referrersRouter from "../routes/referrersRouter";
import uploadsRouter from "../routes/uploadsRouter";

function createServer() {
  const server = express();
  server.use(express.json());

  server.use("/api/news", newsRouter);
  server.use("/api/referrers", referrersRouter);
  server.use("/api/uploads", uploadsRouter);

  server.post("/api/contact", async (req, res) => {
    try {
      const formData = req.body.formData;
      await sendContactForm(formData as ContactFormData);
      res.status(200).send("Success");
    } catch (e) {
      handleError(e, () => res.status(500).send("Internal server error"));
    }
  });

  return server;
}

export default createServer;
