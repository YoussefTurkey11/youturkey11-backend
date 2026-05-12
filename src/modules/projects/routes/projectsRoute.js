import express from "express";
import { protect, authorize } from "../../../middleware/authMiddleware.js";
import {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
  toggleFeatured,
  getProjectById,
} from "../controllers/projectsController.js";
import {
  createProjectValidator,
  updateProjectValidator,
} from "../validators/projectsValidator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Projects Management APIs
 */

/**
 * @swagger
 * /api/v1/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [frontend, backend, fullstack, mobile, other]
 *       - in: query
 *         name: featured
 *         schema:
 *           type: boolean
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
 *         description: List of projects
 */
router.get("/", getAllProjects);

/**
 * @swagger
 * /api/v1/projects/id:
 *   get:
 *     summary: Get project by id
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project data
 *       404:
 *         description: Project not found
 */
router.get("/:id", getProjectById);

/**
 * @swagger
 * /api/v1/projects:
 *   post:
 *     summary: Create new project (Admin only)
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Project created successfully
 */
router.post(
  "/",
  protect,
  authorize("admin"),
  createProjectValidator,
  createProject,
);

/**
 * @swagger
 * /api/v1/projects/{id}:
 *   patch:
 *     summary: Update project (Admin only)
 *     tags: [Projects]
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
 *         description: Project updated successfully
 */
router.patch(
  "/:id",
  protect,
  authorize("admin"),
  updateProjectValidator,
  updateProject,
);

/**
 * @swagger
 * /api/v1/projects/{id}:
 *   delete:
 *     summary: Delete project (Admin only)
 *     tags: [Projects]
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
 *         description: Project deleted successfully
 */
router.delete("/:id", protect, authorize("admin"), deleteProject);

/**
 * @swagger
 * /api/v1/projects/{id}/toggle-featured:
 *   patch:
 *     summary: Toggle project featured status (Admin only)
 *     tags: [Projects]
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
 *         description: Featured status toggled
 */
router.patch(
  "/:id/toggle-featured",
  protect,
  authorize("admin"),
  toggleFeatured,
);

export default router;
