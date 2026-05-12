import express from "express";
import { protect, authorize } from "../../../middleware/authMiddleware.js";

import {
  createProfile,
  getProfile,
  updateProfile,
  addExperience,
  updateExperience,
  deleteExperience,
  addCertification,
  deleteCertification,
  updateSocialMedia,
  deleteSocialMedia,
  addSocialMedia,
  updateCertification,
} from "../controllers/profileController.js";

import {
  createProfileValidator,
  updateProfileValidator,
  addExperienceValidator,
  addCertificationValidator,
  updateSocialMediaValidator,
  addSocialMediaValidator,
  updateCertificationValidator,
} from "../validators/profileValidator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Profile Management APIs
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get profile data
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 */
router.get("/", getProfile);

/**
 * @swagger
 * /profile:
 *   post:
 *     summary: Create new profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - position
 *               - seniority
 *               - location
 *               - summary
 *               - objective
 *             properties:
 *               position:
 *                 type: string
 *                 example: Frontend Engineer
 *               seniority:
 *                 type: string
 *                 example: Mid-Level
 *               location:
 *                 type: string
 *                 example: Cairo, Egypt
 *               summary:
 *                 type: string
 *                 example: Passionate frontend engineer specialized in Next.js
 *               objective:
 *                 type: string
 *                 example: Building scalable and modern web applications
 *               resumePdf:
 *                 type: string
 *                 example: https://example.com/resume.pdf
 *     responses:
 *       201:
 *         description: Profile created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  protect,
  authorize("admin"),
  createProfileValidator,
  createProfile,
);

/**
 * @swagger
 * /profile/{id}:
 *   patch:
 *     summary: Update profile data
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Profile ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               position:
 *                 type: string
 *               seniority:
 *                 type: string
 *               location:
 *                 type: string
 *               summary:
 *                 type: string
 *               objective:
 *                 type: string
 *               resumePdf:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: Profile not found
 */
router.patch(
  "/:id",
  protect,
  authorize("admin"),
  updateProfileValidator,
  updateProfile,
);

/**
 * @swagger
 * /profile/{id}/experience:
 *   post:
 *     summary: Add work experience
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Profile ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company
 *               - position
 *             properties:
 *               company:
 *                 type: string
 *                 example: Google
 *               position:
 *                 type: string
 *                 example: Frontend Developer
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               currentlyWorking:
 *                 type: boolean
 *                 example: false
 *               description:
 *                 type: string
 *                 example: Worked on scalable frontend applications
 *     responses:
 *       200:
 *         description: Experience added successfully
 */
router.post(
  "/:id/experience",
  protect,
  authorize("admin"),
  addExperienceValidator,
  addExperience,
);

/**
 * @swagger
 * /profile/{id}/experience/{experienceId}:
 *   patch:
 *     summary: Update work experience
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: experienceId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Experience updated successfully
 */
router.patch(
  "/:id/experience/:experienceId",
  protect,
  authorize("admin"),
  updateExperience,
);

/**
 * @swagger
 * /profile/{id}/experience/{experienceId}:
 *   delete:
 *     summary: Delete work experience
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: experienceId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Experience deleted successfully
 */
router.delete(
  "/:id/experience/:experienceId",
  protect,
  authorize("admin"),
  deleteExperience,
);

/**
 * @swagger
 * /profile/{id}/certifications:
 *   post:
 *     summary: Add certification
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Profile ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - issuer
 *             properties:
 *               title:
 *                 type: string
 *                 example: Meta Frontend Certificate
 *               issuer:
 *                 type: string
 *                 example: Meta
 *               fileUrl:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               issueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Certification added successfully
 */
router.post(
  "/:id/certifications",
  protect,
  authorize("admin"),
  addCertificationValidator,
  addCertification,
);

/**
 * @swagger
 * /profile/{id}/certifications/{certificationId}:
 *   patch:
 *     summary: Update certification
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: certificationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Certification updated successfully
 */
router.patch(
  "/:id/certifications/:certificationId",
  protect,
  authorize("admin"),
  updateCertificationValidator,
  updateCertification,
);

/**
 * @swagger
 * /profile/{id}/certifications/{certificationId}:
 *   delete:
 *     summary: Delete certification
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: certificationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Certification deleted successfully
 */
router.delete(
  "/:id/certifications/:certificationId",
  protect,
  authorize("admin"),
  deleteCertification,
);

/**
 * @swagger
 * /profile/{id}/social-media:
 *   post:
 *     summary: Add social media account
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - platform
 *               - url
 *             properties:
 *               platform:
 *                 type: string
 *                 example: linkedin
 *               url:
 *                 type: string
 *                 example: https://linkedin.com/in/username
 *     responses:
 *       200:
 *         description: Social media added successfully
 */
router.post(
  "/:id/social-media",
  protect,
  authorize("admin"),
  addSocialMediaValidator,
  addSocialMedia,
);

/**
 * @swagger
 * /profile/{id}/social-media:
 *   patch:
 *     summary: Update social media accounts
 *     tags: [Profile]
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
 *         description: Social media updated successfully
 */
router.patch(
  "/:id/social-media",
  protect,
  authorize("admin"),
  updateSocialMediaValidator,
  updateSocialMedia,
);

/**
 * @swagger
 * /profile/{id}/social-media/{socialMediaId}:
 *   delete:
 *     summary: Delete social media account
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: socialMediaId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Social media deleted successfully
 */
router.delete(
  "/:id/social-media/:socialMediaId",
  protect,
  authorize("admin"),
  deleteSocialMedia,
);

export default router;
