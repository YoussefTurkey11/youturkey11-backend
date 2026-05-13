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

router.get("/", getAllInterviews);
router.get("/:id", getInterviewById);
router.post(
  "/",
  protect,
  authorize("admin"),
  createInterviewValidator,
  createInterview,
);
router.patch(
  "/:id",
  protect,
  authorize("admin"),
  updateInterviewValidator,
  updateInterview,
);
router.delete("/:id", protect, authorize("admin"), deleteInterview);

export default router;
