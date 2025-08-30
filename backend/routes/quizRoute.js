import express from "express";
import {
  getAllQuizzes,
  createQuiz,
  deleteQuiz,
  updateQuiz,
} from "../controllers/quizController.js";

const router = express.Router();

router.get("/", getAllQuizzes);
router.post("/", createQuiz);
router.delete("/:id", deleteQuiz);
router.put("/:id", updateQuiz);

export default router;
