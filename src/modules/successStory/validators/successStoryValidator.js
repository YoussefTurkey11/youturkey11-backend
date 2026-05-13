import { check } from "express-validator";
import validatorMiddleware from "../../../middleware/validator.js";

export const createSuccessStoryValidator = [
  check("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters")
    .isLength({ max: 150 })
    .withMessage("Title must be less than 150 characters"),

  check("description").trim().notEmpty().withMessage("Description is required"),

  check("link")
    .trim()
    .notEmpty()
    .withMessage("Link is required")
    .isURL()
    .withMessage("Link must be a valid URL"),

  check("image").trim().notEmpty().withMessage("Image is required"),

  validatorMiddleware,
];

export const updateSuccessStoryValidator = [
  check("title")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters")
    .isLength({ max: 150 })
    .withMessage("Title must be less than 150 characters"),

  check("link").optional().isURL().withMessage("Link must be a valid URL"),

  validatorMiddleware,
];
