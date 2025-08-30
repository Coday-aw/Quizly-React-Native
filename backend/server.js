import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db.js";
import quizRoute from "./routes/quizRoute.js";

dbConnect();

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());

app.use("/api/quizzes", quizRoute);
