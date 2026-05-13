import { check } from "express-validator";
import validatorMiddleware from "../../../../middleware/validator.js";

export const createInterviewValidator = [
  check("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),

  check("questions")
    .isArray({ min: 1 })
    .withMessage("Questions must be an array with at least one item"),

  check("questions.*.question")
    .trim()
    .notEmpty()
    .withMessage("Each question text is required"),

  check("questions.*.answer")
    .trim()
    .notEmpty()
    .withMessage("Each answer is required"),

  check("level").trim().notEmpty().withMessage("Level is required"),

  check("technologies")
    .isArray({ min: 1 })
    .withMessage("Technologies must have at least one item"),

  validatorMiddleware,
];

export const updateInterviewValidator = [
  check("title").optional().trim(),
  check("level").optional().trim(),
  check("technologies").optional().isArray(),
  check("questions").optional().isArray(),

  validatorMiddleware,
];
