import express from "express";
import { protect, authorize } from "../../../middleware/authMiddleware.js";
import {
  createSuccessStory,
  getAllSuccessStories,
  getSuccessStoryById,
  updateSuccessStory,
  deleteSuccessStory,
} from "../controllers/successStoryController.js";
import {
  createSuccessStoryValidator,
  updateSuccessStoryValidator,
} from "../validators/successStoryValidator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: SuccessStories
 *   description: Success Stories Management APIs
 */

/**
 * @swagger
 * /api/v1/success-stories:
 *   get:
 *     summary: Get all success stories
 *     tags: [SuccessStories]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of success stories
 */
router.get("/", getAllSuccessStories);

/**
 * @swagger
 * /api/v1/success-stories/{id}:
 *   get:
 *     summary: Get success story by ID
 *     tags: [SuccessStories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success story data
 *       404:
 *         description: Success story not found
 */
router.get("/:id", getSuccessStoryById);

/**
 * @swagger
 * /api/v1/success-stories:
 *   post:
 *     summary: Create new success story (Admin only)
 *     tags: [SuccessStories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Success story created successfully
 */
router.post(
  "/",
  protect,
  authorize("admin"),
  createSuccessStoryValidator,
  createSuccessStory,
);

/**
 * @swagger
 * /api/v1/success-stories/{id}:
 *   patch:
 *     summary: Update success story (Admin only)
 *     tags: [SuccessStories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success story updated successfully
 */
router.patch(
  "/:id",
  protect,
  authorize("admin"),
  updateSuccessStoryValidator,
  updateSuccessStory,
);

/**
 * @swagger
 * /api/v1/success-stories/{id}:
 *   delete:
 *     summary: Delete success story (Admin only)
 *     tags: [SuccessStories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success story deleted successfully
 */
router.delete("/:id", protect, authorize("admin"), deleteSuccessStory);

export default router;
