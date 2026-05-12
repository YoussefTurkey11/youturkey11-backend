import { check } from "express-validator";
import validatorMiddleware from "../../../middleware/validator.js";

export const createEventValidator = [
  check("type")
    .notEmpty()
    .withMessage("Type is required")
    .isIn(["offline", "online"])
    .withMessage("Type must be offline or online"),

  check("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters")
    .isLength({ max: 150 })
    .withMessage("Title must be less than 150 characters"),

  check("description").trim().notEmpty().withMessage("Description is required"),

  check("image").trim().notEmpty().withMessage("Image is required"),

  check("link")
    .trim()
    .notEmpty()
    .withMessage("Link is required")
    .isURL()
    .withMessage("Link must be a valid URL"),

  check("location").trim().notEmpty().withMessage("Location is required"),

  check("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Start date must be a valid date"),

  check("endDate")
    .notEmpty()
    .withMessage("End date is required")
    .isISO8601()
    .withMessage("End date must be a valid date"),

  validatorMiddleware,
];

export const updateEventValidator = [
  check("type")
    .optional()
    .isIn(["offline", "online"])
    .withMessage("Type must be offline or online"),

  check("title")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters")
    .isLength({ max: 150 })
    .withMessage("Title must be less than 150 characters"),

  check("link").optional().isURL().withMessage("Link must be a valid URL"),

  check("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be a valid date"),

  check("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be a valid date"),

  validatorMiddleware,
];
