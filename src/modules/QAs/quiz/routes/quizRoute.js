import express from "express";
import { protect, authorize } from "../../../../middleware/authMiddleware.js";
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  submitQuiz,
  updateQuiz,
  deleteQuiz,
} from "../controllers/quizController.js";
import {
  createQuizValidator,
  submitQuizValidator,
} from "../validators/quizValidator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: Quiz Management APIs
 */

router.get("/", getAllQuizzes);
router.get("/:id", getQuizById);
router.post("/", protect, authorize("admin"), createQuizValidator, createQuiz);
router.post("/:id/submit", protect, submitQuizValidator, submitQuiz);
router.patch("/:id", protect, authorize("admin"), updateQuiz);
router.delete("/:id", protect, authorize("admin"), deleteQuiz);

export default router;
