import express from "express";
import { protect, authorize } from "../../../middleware/authMiddleware.js";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  toggleActive,
} from "../controllers/servicesController.js";
import {
  createServiceValidator,
  updateServiceValidator,
} from "../validators/servicesValidator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Services Management APIs
 */

/**
 * @swagger
 * /api/v1/services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: isActive
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
 *         description: List of services
 */
router.get("/", getAllServices);

/**
 * @swagger
 * /api/v1/services/{id}:
 *   get:
 *     summary: Get service by ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service data
 *       404:
 *         description: Service not found
 */
router.get("/:id", getServiceById);

/**
 * @swagger
 * /api/v1/services:
 *   post:
 *     summary: Create new service (Admin only)
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Service created successfully
 */
router.post(
  "/",
  protect,
  authorize("admin"),
  createServiceValidator,
  createService,
);

/**
 * @swagger
 * /api/v1/services/{id}:
 *   patch:
 *     summary: Update service (Admin only)
 *     tags: [Services]
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
 *         description: Service updated successfully
 */
router.patch(
  "/:id",
  protect,
  authorize("admin"),
  updateServiceValidator,
  updateService,
);

/**
 * @swagger
 * /api/v1/services/{id}:
 *   delete:
 *     summary: Delete service (Admin only)
 *     tags: [Services]
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
 *         description: Service deleted successfully
 */
router.delete("/:id", protect, authorize("admin"), deleteService);

/**
 * @swagger
 * /api/v1/services/{id}/toggle-active:
 *   patch:
 *     summary: Toggle service active status (Admin only)
 *     tags: [Services]
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
 *         description: Active status toggled
 */
router.patch("/:id/toggle-active", protect, authorize("admin"), toggleActive);

export default router;
