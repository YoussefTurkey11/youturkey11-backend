import { check } from "express-validator";
import validatorMiddleware from "../../../middleware/validator.js";

export const createProjectValidator = [
  check("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(["frontend", "backend", "fullstack", "mobile", "other"])
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

  check("coverImage").trim().notEmpty().withMessage("Cover image is required"),

  check("technologies")
    .isArray({ min: 1 })
    .withMessage("Technologies must be an array with at least one item"),

  check("technologies.*")
    .trim()
    .notEmpty()
    .withMessage("Each technology must be a non-empty string"),

  check("liveDemo")
    .trim()
    .notEmpty()
    .withMessage("Live demo URL is required")
    .isURL()
    .withMessage("Live demo must be a valid URL"),

  check("githubRepo")
    .optional()
    .isURL()
    .withMessage("GitHub repo must be a valid URL"),

  check("gallery").optional().isArray().withMessage("Gallery must be an array"),

  validatorMiddleware,
];

export const updateProjectValidator = [
  check("category")
    .optional()
    .isIn(["frontend", "backend", "fullstack", "mobile", "other"])
    .withMessage("Invalid category"),

  check("title")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters")
    .isLength({ max: 150 })
    .withMessage("Title must be less than 150 characters"),

  check("technologies")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Technologies must have at least one item"),

  check("liveDemo")
    .optional()
    .isURL()
    .withMessage("Live demo must be a valid URL"),

  check("githubRepo")
    .optional()
    .isURL()
    .withMessage("GitHub repo must be a valid URL"),

  validatorMiddleware,
];
