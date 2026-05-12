import express from "express";
import { protect, authorize } from "../../../middleware/authMiddleware.js";
import {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  togglePublish,
} from "../controllers/blogsController.js";
import {
  createBlogValidator,
  updateBlogValidator,
} from "../validators/blogsValidator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog Management APIs
 */

/**
 * @swagger
 * /api/v1/blogs:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 *     parameters:
 *       - in: query
 *         name: published
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
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
 *         description: List of blogs
 */
router.get("/", getAllBlogs);

/**
 * @swagger
 * /api/v1/blogs/{slug}:
 *   get:
 *     summary: Get blog by slug
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog data
 *       404:
 *         description: Blog not found
 */
router.get("/:slug", getBlogBySlug);

/**
 * @swagger
 * /api/v1/blogs:
 *   post:
 *     summary: Create new blog (Admin only)
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Blog created successfully
 */
router.post("/", protect, authorize("admin"), createBlogValidator, createBlog);

/**
 * @swagger
 * /api/v1/blogs/{slug}:
 *   patch:
 *     summary: Update blog (Admin only)
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog updated successfully
 */
router.patch(
  "/:slug",
  protect,
  authorize("admin"),
  updateBlogValidator,
  updateBlog,
);

/**
 * @swagger
 * /api/v1/blogs/{slug}:
 *   delete:
 *     summary: Delete blog (Admin only)
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 */
router.delete("/:slug", protect, authorize("admin"), deleteBlog);

/**
 * @swagger
 * /api/v1/blogs/{slug}/toggle-publish:
 *   patch:
 *     summary: Toggle blog publish status (Admin only)
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publish status toggled
 */
router.patch(
  "/:slug/toggle-publish",
  protect,
  authorize("admin"),
  togglePublish,
);

export default router;
