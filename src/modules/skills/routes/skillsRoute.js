import express from "express";
import { protect, authorize } from "../../../middleware/authMiddleware.js";
import {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
} from "../controllers/skillsController.js";
import {
  createSkillValidator,
  updateSkillValidator,
} from "../validators/skillsValidator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Skills
 *   description: Skills Management APIs
 */

/**
 * @swagger
 * /api/v1/skills:
 *   get:
 *     summary: Get all skills
 *     tags: [Skills]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [tech, soft]
 *     responses:
 *       200:
 *         description: Skills grouped by category
 */
router.get("/", getAllSkills);

/**
 * @swagger
 * /api/v1/skills/{id}:
 *   get:
 *     summary: Get skill by ID
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Skill data
 *       404:
 *         description: Skill not found
 */
router.get("/:id", getSkillById);

/**
 * @swagger
 * /api/v1/skills:
 *   post:
 *     summary: Create new skill (Admin only)
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category
 *               - title
 *             properties:
 *               category:
 *                 type: string
 *                 enum: [tech, soft]
 *               title:
 *                 type: string
 *                 example: React.js
 *     responses:
 *       201:
 *         description: Skill created successfully
 *       400:
 *         description: Skill already exists
 */
router.post(
  "/",
  protect,
  authorize("admin"),
  createSkillValidator,
  createSkill,
);

/**
 * @swagger
 * /api/v1/skills/{id}:
 *   patch:
 *     summary: Update skill (Admin only)
 *     tags: [Skills]
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
 *         description: Skill updated successfully
 */
router.patch(
  "/:id",
  protect,
  authorize("admin"),
  updateSkillValidator,
  updateSkill,
);

/**
 * @swagger
 * /api/v1/skills/{id}:
 *   delete:
 *     summary: Delete skill (Admin only)
 *     tags: [Skills]
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
 *         description: Skill deleted successfully
 */
router.delete("/:id", protect, authorize("admin"), deleteSkill);

export default router;
