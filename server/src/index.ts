import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { databaseConnect } from "./database/database.config";
import apiRoutes from "./routes/UserRoutes";
import BookmarkRoutes from "./routes/BookmarkRoute";
import BlogRoutes from "./routes/BlogRoute";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 6000;
app.use(express.json());
app.use(cors());
const connect = async () => {
  app.use("/api/v1", apiRoutes);
  app.use("/api/v1",BookmarkRoutes);
  app.use("/api/v1",BlogRoutes);
  await databaseConnect();
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};

connect();
