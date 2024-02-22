import express from "express";
import ViteExpress from "vite-express";

import newsRouter from "./routes/newsRouter.js";
import referrersRouter from "./routes/referrersRouter.js";
import uploadsRouter from "./routes/uploadsRouter.js";
import { sendContactForm } from "./emailService.js";
import { MongoError } from "mongodb";

const app = express();
app.use(express.json());

app.use("/api/news", newsRouter);
app.use("/api/referrers", referrersRouter);
app.use("/api/uploads", uploadsRouter);

app.post("/api/contact", async (req, res) => {
  try {
    const formData = req.body.formData;
    await sendContactForm(formData as ContactFormData);
    res.status(200).send("Success");
  } catch (e) {
    handleError(e, () => res.status(500).send("Internal server error"));
  }
});

ViteExpress.listen(app, 3001, () =>
  console.log("Server is listening on port 3001...")
);

export function handleError(e: unknown, callback: () => void) {
  if (e instanceof MongoError) {
    console.log("Mongo error: " + e.message);
  } else {
    console.log((e as Error).message);
  }
  callback();
}
