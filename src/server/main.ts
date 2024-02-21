import express from "express";
import ViteExpress from "vite-express";

import newsRouter from "./routes/newsRouter.js";
import referrersRouter from "./routes/referrersRouter.js";
import uploadsRouter from "./routes/uploadsRouter.js";
import { sendContactForm } from "./emailService.js";

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
    console.log((e as Error).message);
    res.status(500).send("Unknown error occurred");
  }
});

ViteExpress.listen(app, 3001, () =>
  console.log("Server is listening on port 3001...")
);
