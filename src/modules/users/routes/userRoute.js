import express from "express";
import { protect, authorize } from "../../../middleware/authMiddleware.js";
import {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.use(protect, authorize("admin"));

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Admin - User Management APIs
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Forbidden - Admin only
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f1b2c3d4e5f6a7b8c9d0e1
 *     responses:
 *       200:
 *         description: User data
 *       404:
 *         description: User not found
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Forbidden - Admin only
 */
router.get("/:id", getUserById);

/**
 * @swagger
 * /api/v1/users/{id}/role:
 *   patch:
 *     summary: Update user role
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f1b2c3d4e5f6a7b8c9d0e1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 example: admin
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       400:
 *         description: Invalid role
 *       404:
 *         description: User not found
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Forbidden - Admin only
 */
router.patch("/:id/role", updateUserRole);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f1b2c3d4e5f6a7b8c9d0e1
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Forbidden - Admin only
 */
router.delete("/:id", deleteUser);

export default router;
