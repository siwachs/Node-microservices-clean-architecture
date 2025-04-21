import "reflect-metadata";
import express from "express";

import router from "./routes/productRoutes";

const PORT = process.env.PORT || 9000;

const app = express();
app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log("Listening to: ", PORT);
});
