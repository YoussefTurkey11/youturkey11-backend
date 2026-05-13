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

/**
 * @swagger
 * /answers/question/{questionId}:
 *   get:
 *     summary: Get all answers for a specific question
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Question ID
 *     responses:
 *       200:
 *         description: Answers fetched successfully
 *       404:
 *         description: Question not found
 */
router.get("/question/:questionId", getAnswersByQuestion);

/**
 * @swagger
 * /answers:
 *   post:
 *     summary: Create a new answer
 *     tags: [Answers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - content
 *             properties:
 *               question:
 *                 type: string
 *                 example: 6822e0c5a4d2a87a3f20c123
 *               content:
 *                 type: string
 *                 example: You can use Express middleware for authentication.
 *     responses:
 *       201:
 *         description: Answer created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", protect, createAnswerValidator, createAnswer);

/**
 * @swagger
 * /answers/{id}:
 *   patch:
 *     summary: Update answer
 *     tags: [Answers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Answer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: Updated answer content
 *     responses:
 *       200:
 *         description: Answer updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Answer not found
 */
router.patch("/:id", protect, updateAnswerValidator, updateAnswer);

/**
 * @swagger
 * /answers/{id}:
 *   delete:
 *     summary: Delete answer (Admin only)
 *     tags: [Answers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Answer ID
 *     responses:
 *       200:
 *         description: Answer deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Answer not found
 */
router.delete("/:id", protect, authorize("admin"), deleteAnswer);

/**
 * @swagger
 * /answers/{id}/vote:
 *   patch:
 *     summary: Vote or unvote an answer
 *     tags: [Answers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Answer ID
 *     responses:
 *       200:
 *         description: Vote updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Answer not found
 */
router.patch("/:id/vote", protect, voteAnswer);

export default router;
