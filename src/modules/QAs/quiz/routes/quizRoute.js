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

/**
 * @swagger
 * /quizzes:
 *   get:
 *     summary: Get all quizzes
 *     tags: [Quizzes]
 *     parameters:
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [easy, medium, hard]
 *         description: Filter quizzes by difficulty
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
 *         description: Number of quizzes per page
 *
 *     responses:
 *       200:
 *         description: Quizzes fetched successfully
 */
router.get("/", getAllQuizzes);

/**
 * @swagger
 * /quizzes/{id}:
 *   get:
 *     summary: Get quiz by ID
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Quiz ID
 *     responses:
 *       200:
 *         description: Quiz fetched successfully
 *       404:
 *         description: Quiz not found
 */
router.get("/:id", getQuizById);

/**
 * @swagger
 * /quizzes:
 *   post:
 *     summary: Create new quiz (Admin only)
 *     tags: [Quizzes]
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
 *               - questions
 *             properties:
 *               title:
 *                 type: string
 *                 example: JavaScript Basics Quiz
 *
 *               difficulty:
 *                 type: string
 *                 enum: [easy, medium, hard]
 *                 example: easy
 *
 *               duration:
 *                 type: integer
 *                 example: 30
 *                 description: Quiz duration in minutes
 *
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - questionText
 *                     - options
 *                     - correctAnswer
 *                   properties:
 *                     questionText:
 *                       type: string
 *                       example: What is JavaScript?
 *
 *                     options:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - Programming Language
 *                         - Database
 *                         - Operating System
 *
 *                     correctAnswer:
 *                       type: string
 *                       example: Programming Language
 *
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post("/", protect, authorize("admin"), createQuizValidator, createQuiz);

/**
 * @swagger
 * /quizzes/{id}/submit:
 *   post:
 *     summary: Submit quiz answers
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Quiz ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - answers
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionIndex:
 *                       type: integer
 *                       example: 0
 *
 *                     selectedAnswer:
 *                       type: string
 *                       example: Programming Language
 *
 *     responses:
 *       200:
 *         description: Quiz submitted successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Quiz not found
 */
router.post("/:id/submit", protect, submitQuizValidator, submitQuiz);

/**
 * @swagger
 * /quizzes/{id}:
 *   patch:
 *     summary: Update quiz (Admin only)
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Quiz ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *
 *               difficulty:
 *                 type: string
 *                 enum: [easy, medium, hard]
 *
 *               duration:
 *                 type: integer
 *
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionText:
 *                       type: string
 *
 *                     options:
 *                       type: array
 *                       items:
 *                         type: string
 *
 *                     correctAnswer:
 *                       type: string
 *
 *     responses:
 *       200:
 *         description: Quiz updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Quiz not found
 */
router.patch("/:id", protect, authorize("admin"), updateQuiz);

/**
 * @swagger
 * /quizzes/{id}:
 *   delete:
 *     summary: Delete quiz (Admin only)
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Quiz ID
 *     responses:
 *       200:
 *         description: Quiz deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Quiz not found
 */
router.delete("/:id", protect, authorize("admin"), deleteQuiz);

export default router;
