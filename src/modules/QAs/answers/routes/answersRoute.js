import express from "express";
import { protect, authorize } from "../../../../middleware/authMiddleware.js";
import {
  createAnswer,
  getAnswersByQuestion,
  updateAnswer,
  deleteAnswer,
  voteAnswer,
} from "../controllers/answersController.js";
import {
  createAnswerValidator,
  updateAnswerValidator,
} from "../validators/answersValidator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Answers
 *   description: Answers Management APIs
 */

router.get("/question/:questionId", getAnswersByQuestion);
router.post("/", protect, createAnswerValidator, createAnswer);
router.patch("/:id", protect, updateAnswerValidator, updateAnswer);
router.delete("/:id", protect, authorize("admin"), deleteAnswer);
router.patch("/:id/vote", protect, voteAnswer);

export default router;
