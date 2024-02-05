import express from "express";
import ViteExpress from "vite-express";

import newsRouter from "./routes/newsRouter.js";
import referrersRouter from "./routes/referrersRouter.js";
import uploadsRouter from "./routes/uploadsRouter.js";

const app = express();
app.use(express.json());

app.use("/api/news", newsRouter);
app.use("/api/referrers", referrersRouter);
app.use("/api/uploads", uploadsRouter);

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
