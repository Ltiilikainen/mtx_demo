import ViteExpress from "vite-express";
import createServer from "./utils/server";

const app = createServer();

ViteExpress.listen(app, 3001, () =>
  console.log("Server is listening on port 3001...")
);
