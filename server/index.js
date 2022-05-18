import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
dotenv.config();

const app = express();
app.use(cors());
//app.use(express.json());

//app.use(bodyParser.json({ limit: "30mb", extended: true }));
//app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb" }));

app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Hello to Memories API");
});

//mongo

const CONNECTION_URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));
