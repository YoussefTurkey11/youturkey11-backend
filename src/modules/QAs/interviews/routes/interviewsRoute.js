import express from "express";
import { protect, authorize } from "../../../../middleware/authMiddleware.js";

import {
  createInterview,
  getAllInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
} from "../controllers/interviewsController.js";

import {
  createInterviewValidator,
  updateInterviewValidator,
} from "../validators/interviewsValidator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Interviews
 *   description: Interview Questions APIs
 */

/**
 * @swagger
 * /interviews:
 *   get:
 *     summary: Get all interviews
 *     tags: [Interviews]
 *     parameters:
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *           example: junior
 *         description: Filter interviews by level
 *
 *       - in: query
 *         name: technology
 *         schema:
 *           type: string
 *           example: nodejs
 *         description: Filter interviews by technology
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
 *         description: Number of interviews per page
 *
 *     responses:
 *       200:
 *         description: Interviews fetched successfully
 */
router.get("/", getAllInterviews);

/**
 * @swagger
 * /interviews/{id}:
 *   get:
 *     summary: Get interview by ID
 *     tags: [Interviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Interview ID
 *     responses:
 *       200:
 *         description: Interview fetched successfully
 *       404:
 *         description: Interview not found
 */
router.get("/:id", getInterviewById);

/**
 * @swagger
 * /interviews:
 *   post:
 *     summary: Create new interview (Admin only)
 *     tags: [Interviews]
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
 *               - level
 *               - technologies
 *               - questions
 *             properties:
 *               title:
 *                 type: string
 *                 example: Node.js Backend Interview
 *
 *               level:
 *                 type: string
 *                 example: mid-level
 *
 *               technologies:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - nodejs
 *                   - express
 *                   - mongodb
 *
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                       example: What is middleware in Express.js?
 *
 *                     answer:
 *                       type: string
 *                       example: Middleware is a function that runs between request and response.
 *
 *     responses:
 *       201:
 *         description: Interview created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post(
  "/",
  protect,
  authorize("admin"),
  createInterviewValidator,
  createInterview,
);

/**
 * @swagger
 * /interviews/{id}:
 *   patch:
 *     summary: Update interview (Admin only)
 *     tags: [Interviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Interview ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               level:
 *                 type: string
 *               technologies:
 *                 type: array
 *                 items:
 *                   type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                     answer:
 *                       type: string
 *     responses:
 *       200:
 *         description: Interview updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Interview not found
 */
router.patch(
  "/:id",
  protect,
  authorize("admin"),
  updateInterviewValidator,
  updateInterview,
);

/**
 * @swagger
 * /interviews/{id}:
 *   delete:
 *     summary: Delete interview (Admin only)
 *     tags: [Interviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Interview ID
 *     responses:
 *       200:
 *         description: Interview deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Interview not found
 */
router.delete("/:id", protect, authorize("admin"), deleteInterview);

export default router;
