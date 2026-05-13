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

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Get all questions
 *     tags: [Questions]
 *     parameters:
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *           example: nodejs
 *         description: Filter questions by tag
 *
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *           example: authentication
 *         description: Search questions by title or description
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Current page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of questions per page
 *
 *     responses:
 *       200:
 *         description: Questions fetched successfully
 */
router.get("/", getAllQuestions);

/**
 * @swagger
 * /questions/{id}:
 *   get:
 *     summary: Get question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Question ID
 *     responses:
 *       200:
 *         description: Question fetched successfully
 *       404:
 *         description: Question not found
 */
router.get("/:id", getQuestionById);

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Create new question
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: How does JWT authentication work?
 *
 *               description:
 *                 type: string
 *                 example: I want to understand the full JWT authentication flow in Express.js
 *
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - nodejs
 *                   - express
 *                   - jwt
 *
 *     responses:
 *       201:
 *         description: Question created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", protect, createQuestionValidator, createQuestion);

/**
 * @swagger
 * /questions/{id}:
 *   patch:
 *     summary: Update question
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Question ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated question title
 *
 *               description:
 *                 type: string
 *                 example: Updated question description
 *
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - mongodb
 *                   - mongoose
 *
 *     responses:
 *       200:
 *         description: Question updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Question not found
 */
router.patch("/:id", protect, updateQuestionValidator, updateQuestion);

/**
 * @swagger
 * /questions/{id}:
 *   delete:
 *     summary: Delete question (Admin only)
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Question ID
 *     responses:
 *       200:
 *         description: Question deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Question not found
 */
router.delete("/:id", protect, authorize("admin"), deleteQuestion);

export default router;
