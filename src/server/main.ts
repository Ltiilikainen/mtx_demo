import express from "express";
import ViteExpress from "vite-express";

const app = express();
app.use(express.json());

app.get("/api/news", (_, res) => {
  res.send("You are receiving the news feed");
});

app.get("/api/news/:id", (req, res) => {
  const id = req.params.id;
  res.send("You are receiving the news post " + id);
});

app.get("/api/references", (_, res) => {
  res.send("You are receiving the references");
});

app.get("/api/references/:id", (req, res) => {
  const id = req.params.id;
  res.send("You are receiving the details for reference " + id);
});

app.post("/api/contact", (req, res) => {
  const data = req.body;
  res.send(
    "You are trying to send a contact request email with the contents of " +
      data
  );
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
