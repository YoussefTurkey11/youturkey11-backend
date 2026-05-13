import express from "express";
import { protect, authorize } from "../../../../middleware/authMiddleware.js";
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questionsController.js";
import {
  createQuestionValidator,
  updateQuestionValidator,
} from "../validators/questionsValidator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Questions Management APIs
 */

router.get("/", getAllQuestions);
router.get("/:id", getQuestionById);
router.post("/", protect, createQuestionValidator, createQuestion);
router.patch("/:id", protect, updateQuestionValidator, updateQuestion);
router.delete("/:id", protect, authorize("admin"), deleteQuestion);

export default router;
