import { check } from "express-validator";
import validatorMiddleware from "../../../middleware/validator.js";

export const createProfileValidator = [
  check("position").trim().notEmpty().withMessage("Position is required"),

  check("seniority").trim().notEmpty().withMessage("Seniority is required"),

  check("location").trim().notEmpty().withMessage("Location is required"),

  check("summary")
    .trim()
    .notEmpty()
    .withMessage("Summary is required")
    .isLength({ max: 1000 })
    .withMessage("Summary must be less than 1000 characters"),

  check("objective").trim().notEmpty().withMessage("Objective is required"),

  validatorMiddleware,
];

export const updateProfileValidator = [
  check("position").optional().trim(),
  check("seniority").optional().trim(),
  check("location").optional().trim(),

  check("summary")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Summary must be less than 1000 characters"),

  validatorMiddleware,
];

export const addExperienceValidator = [
  check("company").trim().notEmpty().withMessage("Company is required"),

  check("position").trim().notEmpty().withMessage("Position is required"),

  check("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Start date must be a valid date"),

  check("currentlyWorking")
    .optional()
    .isBoolean()
    .withMessage("currentlyWorking must be boolean"),

  check("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be a valid date"),

  validatorMiddleware,
];

export const addCertificationValidator = [
  check("title").trim().notEmpty().withMessage("Title is required"),

  check("issuer").trim().notEmpty().withMessage("Issuer is required"),

  check("issueDate")
    .notEmpty()
    .withMessage("Issue date is required")
    .isISO8601()
    .withMessage("Issue date must be a valid date"),

  validatorMiddleware,
];

export const updateCertificationValidator = [
  check("title").optional().trim(),
  check("issuer").optional().trim(),
  check("issueDate")
    .optional()
    .isISO8601()
    .withMessage("Issue date must be a valid date"),
  validatorMiddleware,
];

export const addSocialMediaValidator = [
  check("platform").trim().notEmpty().withMessage("Platform is required"),

  check("url")
    .trim()
    .notEmpty()
    .withMessage("URL is required")
    .isURL()
    .withMessage("URL must be valid"),

  validatorMiddleware,
];

export const updateSocialMediaValidator = [
  check("socialMedia").isArray().withMessage("Social media must be an array"),

  check("socialMedia.*.platform")
    .trim()
    .notEmpty()
    .withMessage("Platform is required"),

  check("socialMedia.*.url")
    .trim()
    .notEmpty()
    .withMessage("URL is required")
    .isURL()
    .withMessage("URL must be valid"),

  validatorMiddleware,
];
