import { check } from "express-validator";
import validatorMiddleware from "../../../middleware/validator.js";

const validCategories = [
  "Training and Mentorship",
  "Freelance Projects",
  "Work Opportunities",
  "Online and Offline Workshops | Talks",
  "Podcast and Youtube",
];

export const createServiceValidator = [
  check("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(validCategories)
    .withMessage("Invalid category"),

  check("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters")
    .isLength({ max: 150 })
    .withMessage("Title must be less than 150 characters"),

  check("description").trim().notEmpty().withMessage("Description is required"),

  check("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  check("features")
    .isArray({ min: 1 })
    .withMessage("Features must be an array with at least one item"),

  check("features.*")
    .trim()
    .notEmpty()
    .withMessage("Each feature must be a non-empty string"),

  check("bookingLink")
    .trim()
    .notEmpty()
    .withMessage("Booking link is required")
    .isURL()
    .withMessage("Booking link must be a valid URL"),

  check("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),

  validatorMiddleware,
];

export const updateServiceValidator = [
  check("category")
    .optional()
    .isIn(validCategories)
    .withMessage("Invalid category"),

  check("title")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters")
    .isLength({ max: 150 })
    .withMessage("Title must be less than 150 characters"),

  check("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  check("features")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Features must have at least one item"),

  check("bookingLink")
    .optional()
    .isURL()
    .withMessage("Booking link must be a valid URL"),

  check("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),

  validatorMiddleware,
];
