import express from "express";
import { protect, authorize } from "../../../middleware/authMiddleware.js";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventsController.js";
import {
  createEventValidator,
  updateEventValidator,
} from "../validators/eventsValidator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Events Management APIs
 */

/**
 * @swagger
 * /api/v1/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [online, offline]
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
 *         description: List of events
 */
router.get("/", getAllEvents);

/**
 * @swagger
 * /api/v1/events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event data
 *       404:
 *         description: Event not found
 */
router.get("/:id", getEventById);

/**
 * @swagger
 * /api/v1/events:
 *   post:
 *     summary: Create new event (Admin only)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Event created successfully
 */
router.post(
  "/",
  protect,
  authorize("admin"),
  createEventValidator,
  createEvent,
);

/**
 * @swagger
 * /api/v1/events/{id}:
 *   patch:
 *     summary: Update event (Admin only)
 *     tags: [Events]
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
 *         description: Event updated successfully
 */
router.patch(
  "/:id",
  protect,
  authorize("admin"),
  updateEventValidator,
  updateEvent,
);

/**
 * @swagger
 * /api/v1/events/{id}:
 *   delete:
 *     summary: Delete event (Admin only)
 *     tags: [Events]
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
 *         description: Event deleted successfully
 */
router.delete("/:id", protect, authorize("admin"), deleteEvent);

export default router;
