import { check } from "express-validator";
import validatorMiddleware from "../../../middleware/validator.js";

export const createBlogValidator = [
  check("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 characters")
    .isLength({ max: 150 })
    .withMessage("Title must be less than 150 characters"),

  check("excerpt")
    .trim()
    .notEmpty()
    .withMessage("Excerpt is required")
    .isLength({ max: 300 })
    .withMessage("Excerpt must be less than 300 characters"),

  check("description").trim().notEmpty().withMessage("Description is required"),

  check("content").notEmpty().withMessage("Content is required"),

  check("coverImage").trim().notEmpty().withMessage("Cover image is required"),

  check("tags").optional().isArray().withMessage("Tags must be an array"),

  validatorMiddleware,
];

export const updateBlogValidator = [
  check("title")
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 characters")
    .isLength({ max: 150 })
    .withMessage("Title must be less than 150 characters"),

  check("excerpt")
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage("Excerpt must be less than 300 characters"),

  check("tags").optional().isArray().withMessage("Tags must be an array"),

  validatorMiddleware,
];
